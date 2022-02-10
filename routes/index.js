const router = require("express").Router();

// const apiRoutes = require("./api");

// router.use("/api", apiRoutes);
router.get("/", (req, res) => {
  res.json({
    message: "Base level",
  });
});

// router.use((req, res) => {
//   res.status(404).send("404 error");
// });

module.exports = router;
