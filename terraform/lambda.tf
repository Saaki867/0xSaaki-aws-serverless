data "archive_file" "get_data_lambda" {
  type        = "zip"
  source_file = "${path.module}/../backend/functions/getData.js"
  output_path = "${path.module}/files/getData.zip"
}

data "archive_file" "post_data_lambda" {
  type        = "zip"
  source_file = "${path.module}/../backend/functions/postData.js"
  output_path = "${path.module}/files/postData.zip"
}

resource "aws_lambda_function" "get_data" {
  filename         = data.archive_file.get_data_lambda.output_path
  function_name    = "${var.app_name}-get-data"
  role             = aws_iam_role.lambda_role.arn
  handler          = "getData.handler"
  source_code_hash = data.archive_file.get_data_lambda.output_base64sha256
  runtime          = "nodejs16.x"
  timeout          = 10

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.app_data.name
    }
  }
}

resource "aws_lambda_function" "post_data" {
  filename         = data.archive_file.post_data_lambda.output_path
  function_name    = "${var.app_name}-post-data"
  role             = aws_iam_role.lambda_role.arn
  handler          = "postData.handler"
  source_code_hash = data.archive_file.post_data_lambda.output_base64sha256
  runtime          = "nodejs16.x"
  timeout          = 10

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.app_data.name
    }
  }
}

resource "aws_lambda_permission" "api_gw_get_data" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_data.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "api_gw_post_data" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.post_data.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}
