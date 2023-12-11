const userResponse = {
  create: {
    201: {
      description: 'User created',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/user',
          },
        },
      },
    },
    400: {
      description: 'Incorrect parameters',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
  get: {
    200: {
      description: 'User information',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/user',
          },
        },
      },
    },
    400: {
      description: 'Incorrect parameters',
    },
    404: {
      description: 'User not found',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
};

export default userResponse;
