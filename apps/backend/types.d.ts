import "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// in case above code doesn't work
export type tRequestWithUser = Request & { user?: any };
