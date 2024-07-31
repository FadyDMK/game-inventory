const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.genresControllerGet = asyncHandler(async (req, res) => {
  const genres = await db.getCategories();
  const data = { categories: genres, category: "Genres" };
  res.render("index", { mode: "categories", data });
});

exports.developersControllerGet = asyncHandler(async (req, res) => {
  const developers = await db.getDevelopers();
  const data = { categories: developers, category: "Developers" };
  res.render("index", { mode: "categories", data });
});

exports.allGamesControllerGet = asyncHandler(async (req, res) => {
  const games = await db.getGames();
  const data = { games: games};
  res.render("index", { mode: "Games", data });
});
