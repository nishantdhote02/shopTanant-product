const ApiResponse = require("../utils/apiResponse");
const AsyncHandler = require("../utils/asyncHandler");

class baseController {
  constroller(service) {
    this.service = service;
  }

  create = AsyncHandler(async (req, res) => {
    const data = await this.service.create(req.body);
    res.status(201).json(new ApiResponse("created", data));
  });
}

module.exports = baseController;
