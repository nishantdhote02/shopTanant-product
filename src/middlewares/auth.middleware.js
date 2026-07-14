const jwtHelper = require("../utils/jwt");
const ApiError = require("../utils/apiError");
const UserRepository = require("../repositories/user.repository");
const userRepo = new UserRepository();

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Authentication token is missing. Please log in.");
    }

    const decoded = jwtHelper.verifyToken(token);
    if (!decoded || !decoded.id) {
      throw new ApiError(401, "Invalid authentication token. Access denied.");
    }

    const user = await userRepo.findById(decoded.id);
    if (!user) {
      throw new ApiError(401, "User session not found. Access denied.");
    }

    // Attach user information and tenant ID to the request object
    req.user = user;
    req.tenantId = user.tenantId;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
