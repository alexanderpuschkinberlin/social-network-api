const { User, Thought } = require("../models");

//get users handler
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select("-__v");
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//get single user handler
const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts");

    res.json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//create user handler
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// update user handler
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//delete user handler
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });
    res.json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// add friend handler
const addFriend = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// delete friend handler
const deleteFriend = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
};
