const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.searchControllerGet = asyncHandler(async (req, res) => {
  const search = req.query.search;
  const results = await db.searchGame(search);
  res.render("search", { results });
});
