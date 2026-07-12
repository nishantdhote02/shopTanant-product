const UserRepository = require("../repositories/user.repository");
const ApiError = require("../utils/apiError");
const Bcrypt = require("../utils/bcrypt");
const jwtHelper = require("../utils/jwt");

const userRepo = new UserRepository();
const bcrpyt = new Bcrypt();

class UserService {
  async createUser(data, tenantId, options = {}) {
    let sellerEmail = data.sellerEmail?.toLowerCase()?.trim();
    // existing user check
    const existedUser = await userRepo.findByTenant(tenantId, sellerEmail);

    if (existedUser) {
      throw new ApiError(409, "user already exist");
    }

    //  password hashing
    const hashedPassword = await bcrpyt.hashPass(data?.password);

    try {
      // creat user steps
      // 1. user data object
      const userData = {
        sellerName: data?.sellerName,
        sellerEmail: data?.sellerEmail,
        password: hashedPassword,
        tenantId,
      };

      // 2. creating user
      const User = await userRepo.create(userData);

      // 3. genrate jwt token
      const token = jwtHelper.generateToken(User.dataValues.id);

      // 4. send response
      return { User, token };
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  }

  async loginUserByEmail(sellerEmail, tenantId, password) {
    let trimmedEmail = sellerEmail?.toLowerCase().trim();

    if (!trimmedEmail) throw new ApiError(400, "email is required");
    if (!password) throw new ApiError(400, "password is required");
    if (!tenantId) throw new ApiError(400, "tenantId is required");

    let User = await userRepo.findByTenant(tenantId, trimmedEmail);

    if (!User) throw new ApiError(404, "user not found");

    console.log(User);
    // verify password
    let verifyPass = await bcrpyt.comparePass(password, User.password);

    if (!verifyPass) throw new ApiError(401, "incorrect credentials");

    // jwt token
    let token = jwtHelper.generateToken(User.id, User.tenantId);

    if (!token) throw new ApiError(500, "error in jwt genrate token");

    return { User, token };
  }

  async updateUser(tenantId, sellerEmail, sellerName) {
    if (!tenantId) throw new ApiError(400, "tenantId is required");
    // if (!sellerEmail) throw new ApiError(400, "Email is required");
    // if (!sellerName) throw new ApiError(400, "Name is required");
    let data = {
      sellerEmail,
      sellerName,
    };
    let updated = await userRepo.update(tenantId, data);
    console.log(updated);
    return updated;
  }
}

module.exports = UserService;
