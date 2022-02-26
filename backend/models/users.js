//创建骨架

const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
    username: String,
    password: String,
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;