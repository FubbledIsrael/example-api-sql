const successCode = 200;
const errorCode = 500;

/**
 * Catch throw Error
 * 
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const errorHandler = (err, _req, res, _next) => {
  const statusCode = (res.statusCode !== successCode) ? res.statusCode : errorCode;

  if (statusCode === errorCode) {
    console.log(err);
  }

  res.status(statusCode).json({
    message: err.message
  });
}

export default errorHandler;