const User = require("../models/user.model");
const baseRepository = require("./base.repository");

class UserRepository extends baseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(sellerEmail) {
    return await this.model.findOne({
      where: { sellerEmail },
    });
  }
}

module.exports = UserRepository;
