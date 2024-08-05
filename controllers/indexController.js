const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.indexControllerGet = asyncHandler(async (req, res) => {
  const gamesNo = await db.getNumberGames();
  const developersNo = await db.getNumberDevs();
  const genresNo = await db.getNumberGenres();
  const games = await db.getSomeGames();
  const data = {
    gamesNo: gamesNo,
    developersNo: developersNo,
    genresNo: genresNo,
    games: games,
  };
  res.render("index", { mode: "home", data });
});
