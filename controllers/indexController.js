const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.indexControllerGet = asyncHandler(async (req, res) => {
  res.render("index", {mode: "home"});
});