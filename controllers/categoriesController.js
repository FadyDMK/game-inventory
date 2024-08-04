const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.genresControllerGet = asyncHandler(async (req, res) => {
  const genres = await db.getCategories();
  genres.forEach((genre) => {
    genre.id = genre.category_id;
  });
  const data = { categories: genres, category: "Genres" };
  res.render("index", { mode: "categories", data });
});

exports.developersControllerGet = asyncHandler(async (req, res) => {
  const developers = await db.getDevelopers();
  developers.forEach((developer) => {
    developer.id = developer.developer_id;
  });
  const data = { categories: developers, category: "Developers" };
  res.render("index", { mode: "categories", data });
});

exports.allGamesControllerGet = asyncHandler(async (req, res) => {
  const games = await db.getGames();
  const data = { games: games };
  res.render("index", { mode: "Games", data });
});
exports.genreGamesControllerGet = asyncHandler(async (req, res) => {
  const results = await db.getGamesByCategory(req.query.id);
  console.log("Query:", req.query);
  res.render("search", { results });
});
exports.developerGamesControllerGet = asyncHandler(async (req, res) => {
  const results = await db.getGamesByDeveloper(req.query.id);
  console.log("Query:", req.query);
  res.render("search", { results });
});