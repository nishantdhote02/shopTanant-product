class baseRepository {
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    return await this.repository.create(data);
  }
  async update(id, data) {
    return await this.repository.update(id, data);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }

  async find() {
    return await this.repository.find();
  }
}

module.exports = baseRepository;
