export abstract class AppError {
  public readonly slug: string;
  public readonly message: string;
  public readonly stackTrace: string;

  constructor(slug = "", message = "", stackTrace = "") {
    this.slug = slug;
    this.message = message;
    this.stackTrace = stackTrace;
  }

  toString = (): string =>
    `[${this.constructor.name}]: \nslug: ${this.slug}, \nmessage: ${this.message}, \nstackTrace: ${this.stackTrace}`;
}

export class AppUnknownError extends AppError {
  constructor(
    slug = "app_unknown_error",
    message = "Unknown error",
    stackTrace = ""
  ) {
    super(slug, message, stackTrace);
  }
}

export class ParseError extends AppError {
  constructor(slug = "parse_error", message = "Parse error", stackTrace = "") {
    super(slug, message, stackTrace);
  }

  toString = (): string =>
    `[${this.constructor.name}]: \nslug: ${this.slug}, \nmessage: ${this.message}, \nstackTrace: ${this.stackTrace}`;
}

export class EntityNotFitError extends AppError {
  constructor(
    slug = "entity_error",
    message = "Entity error",
    stackTrace = ""
  ) {
    super(slug, message, stackTrace);
  }

  toString = (): string =>
    `[${this.constructor.name}]: \nslug: ${this.slug}, \nmessage: ${this.message}, \nstackTrace: ${this.stackTrace}`;
}
