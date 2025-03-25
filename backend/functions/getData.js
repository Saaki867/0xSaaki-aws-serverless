const AWS = require('aws-sdk');


const dynamoDB = new AWS.DynamoDB.DocumentClient();


const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
 
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            body: JSON.stringify({})
        };
    }
    
    try {
        console.log('Scanning table:', TABLE_NAME);
        
     
        const params = {
            TableName: TABLE_NAME
        };
        
       
        const result = await dynamoDB.scan(params).promise();
        
        console.log('Scan result:', JSON.stringify(result, null, 2));
        
   
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.Items)
        };
        
        return response;
    } catch (error) {
        console.error('Error scanning DynamoDB table:', error);
        
      
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message: 'Erreur lors de la récupération des données', 
                error: error.message,
                tableName: TABLE_NAME
            })
        };
    }
};
