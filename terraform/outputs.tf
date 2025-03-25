output "website_url" {
  description = "URL du site web S3"
  value       = aws_s3_bucket_website_configuration.frontend_website.website_endpoint
}

output "dynamodb_table_name" {
  description = "Nom de la table DynamoDB"
  value       = aws_dynamodb_table.app_data.name
}

output "dynamodb_table_arn" {
  description = "ARN de la table DynamoDB"
  value       = aws_dynamodb_table.app_data.arn
}
