const express = require("express");
const ProductController  = require("../controllers/product.controller.js");
const authMiddleware = require("../middlewares/auth.middleware");
const tenantMiddleware = require("../middlewares/tenant.middleware");

const router = express.Router();
const ctrl = new ProductController();

// 🛡️ Dummy Middleware
const bypassAuth = (req, res, next) => {
  req.tenantId = "550e8400-e29b-41d4-a716-446655440000"; // Test/Dummy Tenant ID
  next();
};

//  authentication check
const checkAuth = process.env.NODE_ENV === "production" ? [authMiddleware, tenantMiddleware] : [bypassAuth];

router.post("/create", checkAuth, ctrl.create);
router.get("/all", checkAuth, ctrl.getAll);
router.get("/:id", checkAuth, ctrl.getOne);
router.patch("/update/:id", checkAuth, ctrl.update);
router.delete("/delete/:id", checkAuth, ctrl.delete);

module.exports = router;