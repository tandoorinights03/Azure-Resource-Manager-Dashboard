import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResourceGroupTab({ selectedSubscription, setSelectedResourceGroup }) {
    const [resourceGroups, setResourceGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (selectedSubscription) {
            axios.get(`http://localhost:5000/api/resource-groups/${selectedSubscription}`)
                .then(response => {
                    setResourceGroups(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Failed to fetch resource groups');
                    setLoading(false);
                    console.error('Error fetching resource groups:', error);
                });
        } else {
            setResourceGroups([]);
            setLoading(false);
        }
    }, [selectedSubscription]);

    return (
        <div>
            {loading && <p>Loading resource groups...</p>}
            {error && <p className="error">{error}</p>}
            {selectedSubscription ? (
                <select
                    id="resource-group-select"
                    onChange={e => setSelectedResourceGroup(e.target.value)}
                >
                    <option value="">Select a Resource Group</option>
                    {resourceGroups.map(rg => (
                        <option key={rg.id} value={rg.name}>
                            {rg.name}
                        </option>
                    ))}
                </select>
            ) : (
                <p>Please select a subscription to view resource groups.</p>
            )}
        </div>
    );
}

export default ResourceGroupTab;
