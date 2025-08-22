module.exports = class Env {
  static ENV = process.env.ENV || 'DEV';
  static PORT = process.env.PORT || 5001;
};
