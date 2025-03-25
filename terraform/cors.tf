# CORS on API Gateway
resource "aws_api_gateway_method_response" "get_method_response_200" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.data_resource.id
  http_method   = aws_api_gateway_method.get_method.http_method
  status_code   = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "get_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.data_resource.id
  http_method   = aws_api_gateway_method.get_method.http_method
  status_code   = aws_api_gateway_method_response.get_method_response_200.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  
  depends_on = [
    aws_api_gateway_integration.get_integration
  ]
}

resource "aws_api_gateway_method_response" "post_method_response_201" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.data_resource.id
  http_method   = aws_api_gateway_method.post_method.http_method
  status_code   = "201"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "post_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.data_resource.id
  http_method   = aws_api_gateway_method.post_method.http_method
  status_code   = aws_api_gateway_method_response.post_method_response_201.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
  
  depends_on = [
    aws_api_gateway_integration.post_integration
  ]
}
