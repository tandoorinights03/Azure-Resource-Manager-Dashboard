variable "subscription_id" {
  description = "The Subscription ID for the Azure Provider"
  type        = string
}

variable "client_id" {
  description = "The Client ID for the Azure Provider"
  type        = string
}

variable "client_secret" {
  description = "The Client Secret for the Azure Provider"
  type        = string
}

variable "tenant_id" {
  description = "The Tenant ID for the Azure Provider"
  type        = string
}

variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
  default     = "rg-devops-1"
}

variable "location" {
  description = "The Azure location where all resources in this configuration will be created."
  type        = string
  default     = "East US 2"
}

variable "vnet_name" {
  description = "The name of the virtual network."
  type        = string
  default     = "vnet"
}

variable "vnet_address_space" {
  description = "The address space for the virtual network."
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "subnet_name" {
  description = "The name of the subnet within the virtual network."
  type        = string
  default     = "subnet"
}

variable "subnet_prefix" {
  description = "The address prefix for the subnet."
  type        = list(string)
  default     = ["10.0.1.0/24"]
}

variable "vm_name" {
  description = "The name of the virtual machine."
  type        = string
  default     = "vm-devops"
}

variable "vm_size" {
  description = "The size of the virtual machine."
  type        = string
  default     = "Standard_DS2_v2"
}

variable "admin_username" {
  description = "The admin username for the virtual machine."
  type        = string
  default     = "devops"
}

variable "admin_password" {
  description = "The admin password for the virtual machine."
  type        = string
  default     = "devops@123456"
}
