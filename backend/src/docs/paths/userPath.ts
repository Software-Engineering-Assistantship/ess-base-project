import { userResponse } from '../responses';

const userPath = {
  '/user': {
    post: {
      tags: ['User'],
      summary: 'Create a user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/user',
            },
            example: {
              name: 'Ednaldo Pereira',
              phone: '99999999',
              email: 'ednaldopereira@gmail.com',
              password: 'senha',
            },
          },
        },
      },

      responses: userResponse.create,
    },
  },
  '/user/{id}': {
    get: {
      tags: ['User'],
      summary: 'Get user information',
      description: "Get user information from it's id",
      parameters: [{
        in: 'path',
        name: 'id',
        description: 'User id',
        required: true,
        schema: {
          type: 'string',
        },
      }],
      responses: userResponse.get,
    },
  },
};

export default userPath;
