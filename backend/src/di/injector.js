class Injector {
  constructor() {
    this.services = new Map();
    this.repositories = new Map();
  }

  registerService(serviceType, service) {
    this.services.set(serviceType, service);
  }

  getService(serviceType) {
    return this.services.get(serviceType);
  }

  registerRepository(repositoryType, repository) {
    this.repositories.set(repositoryType, repository);
  }

  getRepository(repositoryType) {
    return this.repositories.get(repositoryType);
  }
}

module.exports = Injector;
