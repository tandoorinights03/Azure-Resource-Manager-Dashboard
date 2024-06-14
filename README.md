# Azure Resource Manager Dashboard

# This project is created and maintained by - Jordan Joseph

## Overview

The **Azure Resource Manager Dashboard** is a web application designed to provide a comprehensive and user-friendly interface for managing and viewing Azure resources. This application simplifies the process of accessing and monitoring Azure resources, making it easier for users to manage their cloud infrastructure effectively.

## Business Use Case

In today's fast-paced business environment, managing cloud resources efficiently is critical. The Azure Resource Manager Dashboard addresses this need by providing:

- **Centralized Management**: A single interface to manage multiple Azure subscriptions and resource groups.
- **Quick Resource Filtering**: Easily filter resources by type (e.g., Virtual Machines, Storage Accounts) to find what you need faster.
- **Real-time Data**: Access up-to-date information about your Azure resources in one place.
- **Improved Decision Making**: Get a comprehensive overview of your cloud infrastructure, enabling better resource management and cost optimization.

### Benefits

- **Time Savings**: Reduce the time spent navigating through the Azure portal by having all the necessary information in one dashboard. A task that typically takes multiple clicks and navigation steps can now be accomplished with a single click.
- **Efficiency**: Streamlined resource management improves operational efficiency, allowing teams to focus on more strategic tasks.
- **Ease of Use**: User-friendly interface designed for both technical and non-technical users, making cloud resource management accessible to a broader audience.

## Architecture

- **Frontend**: Built with React, served by an NGINX server.
- **Backend**: Built with Node.js and Express, providing APIs to fetch Azure resources.
- **Deployment**: Dockerized and deployed to Azure Kubernetes Service (AKS).

## Prerequisites

- Azure account
- Azure CLI
- Docker
- Kubernetes CLI (kubectl)
- Azure DevOps account

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/azure-resource-manager-dashboard.git
cd azure-resource-manager-dashboard
