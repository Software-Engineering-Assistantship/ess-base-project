class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'InstanceNotFoundError';
    this.statusCode = 404;
  }
}

export default NotFoundError;