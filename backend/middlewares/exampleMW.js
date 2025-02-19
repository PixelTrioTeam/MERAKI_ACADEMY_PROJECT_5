const example = (socket, next) => {
  // mw event send and recive message & postMan events error listen
  if (socket[0] !== "message") {
    next(new Error("socket meddleWhare Error"));
  } else {
    next();
  }
};
module.exports = example;
