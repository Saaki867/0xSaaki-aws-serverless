const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');


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
   
        let requestBody;
        try {
            requestBody = JSON.parse(event.body);
            console.log('Parsed request body:', requestBody);
        } catch (parseError) {
            console.error('Error parsing request body:', parseError);
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    message: 'Erreur de parsing du JSON', 
                    error: parseError.message,
                    body: event.body
                })
            };
        }
        
        if (!requestBody.title || !requestBody.content) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    message: 'Le titre et le contenu sont requis',
                    requestBody
                })
            };
        }
        
   
        const item = {
            id: uuidv4(), 
            title: requestBody.title,
            content: requestBody.content,
            createdAt: new Date().toISOString()
        };
        
        console.log('Item to insert:', item);
        
      
        const params = {
            TableName: TABLE_NAME,
            Item: item
        };
        
      
        await dynamoDB.put(params).promise();
        
     
        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message: 'Données ajoutées avec succès', 
                item 
            })
        };
    } catch (error) {
        console.error('Error:', error);
        
       
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message: 'Erreur lors de l\'ajout des données', 
                error: error.message 
            })
        };
    }
};
