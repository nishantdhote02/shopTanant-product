const tenantRepository = require("../repositories/tenant.repository");
const ApiError = require("../utils/apiError");
const { generateToken } = require("../utils/jwt");
const baseService = require("./base.service");

const tenantRepo = new tenantRepository();

class tenantService {
  async registerTenant(data) {
    const trimmedOfficialEmail = data?.officialEmail.toLowerCase().trim();

    const existedTenant = await tenantRepo.findByEmail(trimmedOfficialEmail);
    if (existedTenant) throw new ApiError(409, "tenant already exist");

    // create shop tenant

    let shoptenant = await tenantRepo.create(data);
    if (!shoptenant) throw new ApiError(400, "unable to create tenant");

    // jwt token

    let token = generateToken(shoptenant.id);

    return { token, shoptenant };
  }

  // async verifyEmail(data) {
  //   let trimmedEmail = data?.officialEmail.toLowerCase().trim();
  // }

  async findTenantById(tenantId) {
    if (!tenantId) throw new ApiError(400, "tenantId is required");
    const tenant = await tenantRepo.findById(tenantId);

    return tenant;
  }

  async updateById(tenantId, data) {
    if (!tenantId) throw new ApiError(400, "tenantId is required");
    if (!data) throw new ApiError(400, "data is required");

    const tenant = await tenantRepo.update(tenantId, data);
    return tenant;
  }

  async deactivateTenant(tenantId) {
    const res = tenantRepo.deactivate(tenantId);
    return res;
  }

  async activateTenant(tenantId) {
    const res = tenantRepo.activate(tenantId);
    return res;
  }
}

module.exports = tenantService;
