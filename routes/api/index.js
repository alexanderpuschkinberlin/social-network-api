const router = require("express").Router();

const usersRoutes = require("./user-routes");
const thoughtsRoutes = require("./thought-routes");

router.use("/user", usersRoutes);

router.use("/thought", thoughtsRoutes);

module.exports = router;
