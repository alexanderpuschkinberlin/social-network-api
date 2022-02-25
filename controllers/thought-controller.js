const { User, Thought } = require("../models");
// get thoughts handler
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//get single thought
const getSingleThought = async (req, res) => {
  try {
    const singleThought = await Thought.findOne({ _id: req.params.thoughtId });

    res.json(singleThought);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//create thought
const createThought = async (req, res) => {
  console.log(req.body);
  try {
    const newThought = await Thought.create(req.body);
    console.log(newThought);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.json({ message: "Thought created" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//update Thought
const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    res.json(updatedThought);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//delete Thought
const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });
    const updatedUser = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    res.json({ message: "Thought deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//add reaction
const addReaction = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    res.json(updatedThought);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//delete reaction
const removeReaction = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    res.json(updatedThought);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
