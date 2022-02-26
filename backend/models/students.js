//创建骨架

const mongoose = require('mongoose');
const studentsSchema = mongoose.Schema({
    name: String,
    age: Number,
    sex: Number,
    hobby: String,
    phone: Number,
});

const Students = mongoose.model("students", studentsSchema);

module.exports = Students;