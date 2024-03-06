export default class Env {
  public static ENV = process.env.ENV || 'DEV';
  public static PORT = process.env.PORT || 5001;
}
