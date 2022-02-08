const router = require("express").Router();

const {
  getAllThought,
  getThoughtsById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThoughts)
  .delete(deleteThought);

router.route("/:userId").post(createThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
