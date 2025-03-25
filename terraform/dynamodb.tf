# DynamoDB bdd 
resource "aws_dynamodb_table" "app_data" {
  name           = var.dynamodb_table_name
  billing_mode   = "PAY_PER_REQUEST"  # Mode sans provision, facturation à l'usage
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"  # Type String
  }

  tags = {
    Name        = "${var.app_name}-${var.environment}-data"
    Environment = var.environment
  }
}
