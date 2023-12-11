const userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      format: 'password',
    },
  },
  required: ['name', 'email', 'password'],
};

export default userSchema;
