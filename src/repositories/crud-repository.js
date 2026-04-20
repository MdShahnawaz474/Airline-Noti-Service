class crudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    return response;
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError("Data Not Found");
    }
    return response;
  }

  async getAll(data) {
    const response = await this.model.findAll(data);
    return response;
  }
  async update(id, data) {
    const resource = await this.model.findByPk(id);

    if (!resource) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND,
      );
    }

    await resource.update(data);
    return resource;
  }
}
module.exports = crudRepository;
