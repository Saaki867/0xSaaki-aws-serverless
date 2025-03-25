variable "aws_region" {
  description = "Région AWS où déployer les ressources"
  type        = string
  default     = "eu-west-3" 
}

variable "app_name" {
  description = "Nom de l'application"
  type        = string
  default     = "serverless-app"
}

variable "environment" {
  description = "Environnement (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "frontend_bucket_name" {
  description = "Nom du bucket S3 pour le frontend"
  type        = string
  default     = "0xsaaki-serverless-app-frontend-2025" 
}

variable "dynamodb_table_name" {
  description = "Nom de la table DynamoDB"
  type        = string
  default     = "serverless-app-data"
}
