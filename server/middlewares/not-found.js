const notFoundMiddleWare = (req, res) => {
  res.status(404).send('Route doesnt exist');
};

export default notFoundMiddleWare;
