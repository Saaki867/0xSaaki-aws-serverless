provider "aws" {
  region = var.aws_region
  
  # Ces lignes sont facultatives mais recommandées pour étiqueter les ressources
  default_tags {
    tags = {
      Project   = "Serverless-App"
      ManagedBy = "Terraform"
    }
  }
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  
  # Optionnel: configuration pour stocker l'état Terraform dans S3
  # backend "s3" {
  #   bucket = "votre-bucket-terraform-state"
  #   key    = "serverless-app/terraform.tfstate"
  #   region = "eu-west-3"  # Utilisez votre région
  # }
}
