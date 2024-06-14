output "resource_group_name" {
  value       = azurerm_resource_group.main.name
  description = "The name of the resource group."
}

output "virtual_network_name" {
  value       = azurerm_virtual_network.main.name
  description = "The name of the virtual network."
}

output "subnet_name" {
  value       = azurerm_subnet.main.name
  description = "The name of the subnet."
}

output "network_interface_id" {
  value       = azurerm_network_interface.main.id
  description = "The ID of the network interface."
}

output "virtual_machine_id" {
  value       = azurerm_virtual_machine.main.id
  description = "The ID of the virtual machine."
}

output "public_ip_address" {
  value       = azurerm_public_ip.main.ip_address
  description = "The dynamic public IP address assigned to the VM."
}
