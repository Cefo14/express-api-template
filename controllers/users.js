const { CREATED } = require('http-status-codes');
const Users = require('../models/users');
const { paginate } = require('../helpers');

// GET
const index = async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const paginatedUsers = await paginate(Users, page, limit);
    res.json(paginatedUsers);
  }
  catch (err) {
    next(err);
  }
};

// GET
const show = async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const user = await Users.findById(id);
    res.json(user);
  }
  catch (err) {
    next(err);
  }
};

// POST
const store = async (req, res, next) => {
  const { body: { user } } = req;
  try {
    const newUser = await new Users(user).save();
    res.status(CREATED).json(newUser);
  }
  catch (err) {
    next(err);
  }
};

// PUT
const update = async (req, res, next) => {
  const { params: { id } } = req;
  const { body: { user } } = req;
  try {
    const editedUser = await Users.findByIdAndUpdate(id, user, { new: true });
    res.json(editedUser);
  }
  catch (err) {
    next(err);
  }
};

// DELETE
const destroy = async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const user = await Users.findByIdAndDelete(id);
    res.json(user);
  }
  catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
