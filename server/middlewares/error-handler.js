/* eslint-disable no-unused-vars */

const errorHandlerMiddleware = (err, req, res, next) => {
  /* eslint-disable no-console */
  console.log(err);
  /* eslint-disable no-console */
  res.status(500).json({ msg: 'there was an error' });
};

export default errorHandlerMiddleware;
