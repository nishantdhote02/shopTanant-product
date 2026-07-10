const bcrpyt = require("bcrypt");
const ApiError = require("./apiError");
class Bcrypt {
  async hashPass(password) {
    try {
      return await bcrpyt.hash(password, 10);
    } catch (error) {
      throw new ApiError("error is hashing password");
    }
  }

  async comparePass(password, hashpassword) {
    try {
      return await bcrpyt.compare(password, hashpassword);
    } catch (error) {
      throw new ApiError("incorrect password");
    }
  }
}

module.exports = Bcrypt;
