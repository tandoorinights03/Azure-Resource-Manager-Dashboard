import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SubscriptionTab({ setSelectedSubscription }) {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/subscriptions')
            .then(response => {
                setSubscriptions(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch subscriptions');
                setLoading(false);
                console.error('Error fetching subscriptions:', error);
            });
    }, []);

    return (
        <div>
            {loading && <p>Loading subscriptions...</p>}
            {error && <p className="error">{error}</p>}
            <select
                id="subscription-select"
                onChange={e => setSelectedSubscription(e.target.value)}
            >
                <option value="">Select a Subscription</option>
                {subscriptions.map(sub => (
                    <option key={sub.subscriptionId} value={sub.subscriptionId}>
                        {sub.displayName}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SubscriptionTab;
