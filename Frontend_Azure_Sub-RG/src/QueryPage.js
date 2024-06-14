import React, { useState, useEffect } from 'react';
import SubscriptionTab from './SubscriptionTab';
import ResourceGroupTab from './ResourceGroupTab';
import axios from 'axios';
import './index.css';

function QueryPage() {
    const [selectedSubscription, setSelectedSubscription] = useState('');
    const [selectedResourceGroup, setSelectedResourceGroup] = useState('');
    const [selectedResourceType, setSelectedResourceType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);

    useEffect(() => {
        if (selectedResourceType) {
            setFilteredResources(resources.filter(resource => resource.type === selectedResourceType));
        } else {
            setFilteredResources(resources);
        }
    }, [selectedResourceType, resources]);

    const handleQueryResources = () => {
        if (selectedSubscription && selectedResourceGroup) {
            setLoading(true);
            setError(null);
            setResources([]);
            setFilteredResources([]);
            axios.post('http://localhost:5000/api/resource-query', {
                subscriptionId: selectedSubscription,
                resourceGroupName: selectedResourceGroup
            })
            .then(response => {
                setLoading(false);
                setResources(response.data);
                setFilteredResources(response.data);
                console.log('Resources:', response.data);
            })
            .catch(error => {
                setLoading(false);
                setError(error.response?.data?.error || 'Failed to query resources');
                console.error('Resource Query Error:', error);
            });
        } else {
            setError('Please select both a subscription and a resource group.');
        }
    };

    return (
        <div className="query-page-container">
            <h1 className="app-name">Azure Resource Manager Dashboard</h1>
            <div className="tab-container">
                <div className="label-container">
                    <label htmlFor="subscription-select">Azure Subscription</label>
                    <SubscriptionTab setSelectedSubscription={setSelectedSubscription} />
                </div>
                <div className="label-container">
                    <label htmlFor="resource-group-select">Resource Group</label>
                    <ResourceGroupTab
                        selectedSubscription={selectedSubscription}
                        setSelectedResourceGroup={setSelectedResourceGroup}
                    />
                </div>
            </div>
            <div className="button-container">
                <button 
                    onClick={handleQueryResources}
                    disabled={!selectedSubscription || !selectedResourceGroup || loading}
                >
                    Submit
                </button>
                <button 
                    onClick={() => window.location.reload()}
                    disabled={loading}
                >
                    Refresh
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
            {filteredResources && filteredResources.length > 0 && (
                <>
                    <div className="filter-container">
                        <label htmlFor="resource-type-select">Filter by Resource Type:</label>
                        <select
                            id="resource-type-select"
                            onChange={e => setSelectedResourceType(e.target.value)}
                            value={selectedResourceType}
                        >
                            <option value="">All</option>
                            <option value="Microsoft.Compute/virtualMachines">Virtual Machines</option>
                            <option value="Microsoft.Storage/storageAccounts">Storage Accounts</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="table-container">
                        <h2>Resources</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResources.map((resource, index) => (
                                    <tr key={index}>
                                        <td>{resource.type}</td>
                                        <td>{resource.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default QueryPage;
