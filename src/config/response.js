export const respsonseData = (res, message, data, statusCode) => {
  res.status(statusCode).json({
    message: message,
    content: data,
    date: new Date(),
  });
};
