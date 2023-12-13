export default class Injector {
  private services: Map<Function, any> = new Map();
  private repositories: Map<Function, any> = new Map();

  public registerService<T>(
    serviceType: new (...args: any[]) => T,
    service: T
  ): void {
    this.services.set(serviceType, service);
  }

  public getService<T>(serviceType: new (...args: any[]) => T): T {
    return this.services.get(serviceType) as T;
  }

  public registerRepository<T>(
    repositoryType: new (...args: any[]) => T,
    repository: T
  ): void {
    this.repositories.set(repositoryType, repository);
  }

  public getRepository<T>(repositoryType: new (...args: any[]) => T): T {
    return this.repositories.get(repositoryType) as T;
  }
}
