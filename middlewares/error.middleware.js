const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = `Duplicate field value entered: ${err.keyValue.email}`;
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose JSON Web Token error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try again!";
      error = new Error(message);
      error.statusCode = 401;
    }

    // Mongoose Token Expired error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token has expired. Try again!";
      error = new Error(message);
      error.statusCode = 401;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });

    // Log the error for debugging purposes
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode || 500,
    });

    // Call the next middleware in the stack
    next();
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
