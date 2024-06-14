const express = require('express');
const { ClientSecretCredential } = require('@azure/identity');
const { ResourceManagementClient } = require('@azure/arm-resources');
const { SubscriptionClient } = require('@azure/arm-subscriptions');
const cors = require('cors');

const app = express();
const port = 5000;

// Azure credentials - Service Principal
const tenantId = process.env.TENANT_ID || 'Enter your Tenant ID';
const clientId = process.env.CLIENT_ID || 'Enter Your Client ID';
const clientSecret = process.env.CLIENT_SECRET || 'Enter Your Client Secret';

const credentials = new ClientSecretCredential(tenantId, clientId, clientSecret);

app.use(cors());
app.use(express.json());

// Function to list resource groups
async function listResourceGroups(subscriptionId) {
    const client = new ResourceManagementClient(credentials, subscriptionId);
    const iter = client.resourceGroups.list();
    const result = [];
    for await (const rg of iter) {
        result.push(rg);
    }
    return result;
}

// Function to list Azure subscriptions
async function listSubscriptions() {
    const client = new SubscriptionClient(credentials);
    const iter = client.subscriptions.list();
    const result = [];
    for await (const sub of iter) {
        result.push(sub);
    }
    return result;
}

// Function to list resources in a resource group
async function listResources(subscriptionId, resourceGroupName) {
    const client = new ResourceManagementClient(credentials, subscriptionId);
    const resources = [];
    for await (const resource of client.resources.listByResourceGroup(resourceGroupName)) {
        resources.push({ name: resource.name, type: resource.type });
    }
    return resources;
}

// Endpoint to fetch resource groups
app.get('/api/resource-groups/:subscriptionId', async (req, res) => {
    try {
        const subscriptionId = req.params.subscriptionId;
        const groups = await listResourceGroups(subscriptionId);
        res.json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch resource groups' });
    }
});

// Endpoint to fetch Azure subscriptions
app.get('/api/subscriptions', async (req, res) => {
    try {
        const subscriptions = await listSubscriptions();
        res.json(subscriptions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
});

// Endpoint to fetch resources in a resource group
app.post('/api/resource-query', async (req, res) => {
    try {
        const { subscriptionId, resourceGroupName } = req.body;
        console.log('Received data:', req.body); // Log the received data
        if (!subscriptionId || !resourceGroupName) {
            return res.status(400).json({ error: 'Subscription ID and resource group name are required.' });
        }
        // Extract the resource group name if the full path is provided
        const rgName = resourceGroupName.split('/').pop();
        const resources = await listResources(subscriptionId, rgName);
        res.json(resources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to query resources' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
