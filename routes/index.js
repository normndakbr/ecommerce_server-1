const router = require("express").Router();
const userController = require("../controllers/uController");
const productController = require("../controllers/pController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/custProducts", productController.custRead);

router.use(authentication);
router.post("/products", productController.create);
router.get("/products", productController.read);
router.put("/products/:id", productController.update);
router.delete("/products/:id", authorization, productController.delete);

module.exports = router;