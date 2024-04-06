// Error handler for handling all types of errors
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Error handler for handling 404 (Not Found) errors
const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
};

module.exports = { errorHandler, notFoundHandler };
