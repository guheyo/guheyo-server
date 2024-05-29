import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  const message = 'Hello, world!';
  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};
