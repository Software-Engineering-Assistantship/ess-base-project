class DuplicateFieldError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateFieldError';
    this.statusCode = 409;
  }
}

export default DuplicateFieldError;
