export const HttpErrorsHandler = (res: {
    status: number;
    statusText: string;
    url: string;
  }) => {
    const code: number = res.status;
    const message: string = `There is an Error ocured while fetching '${res.url}' ${res.status} (${res.statusText})`;
    switch (code) {
      case 400:
        return new BadRequestError(message);
      case 401:
        return new UnauthorizedError(message);
      case 403:
        return new ForbiddenError(message);
      case 404:
        return new NotFoundError(message);
      case 500:
        return new InternalServerError(message);
    }
  };
  class BadRequestError extends Error {
    statusCode: number;
    constructor(message: string) {
      super(message);
      this.name = "BadRequestError";
      this.statusCode = 400;
    }
  }
  class UnauthorizedError extends Error {
    statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = "UnauthorizedError";
      this.statusCode = 401;
    }
  }
  class ForbiddenError extends Error {
    statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = "ForbiddenError";
      this.statusCode = 403;
    }
  }
  class NotFoundError extends Error {
    statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = "NotFoundError";
      this.statusCode = 404;
    }
  }
  class InternalServerError extends Error {
    statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = "InternalServerError";
      this.statusCode = 500;
    }
  }
  