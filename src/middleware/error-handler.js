const errorHandler = (err, req, res, next) => {
  switch (true) {
    case typeof err === 'string':
      // custom application error
      const is404 = err === 'notFound';
      const statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({ message: err });
    case err.name === 'ValidationError':
      // mongoose validation error
      return res.status(400).json({ message: 'validationError' });
    case err.code === 11000:
      // mongoose duplicate key error
      return res.status(409).json({ message: 'alreadyExist' });
    case err.name === 'unauthorized':
      // jwt authentication error
      return res.status(401).json({ message: 'unauthorized' });

    default:
      return res.status(500).json({ message: err.message });
  }
};

export default errorHandler;
