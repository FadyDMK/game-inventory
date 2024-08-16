const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.gameDetailsControllerGet = asyncHandler(async (req, res) => {
    const game = await db.getGameById(req.params.id);
    const genres = await db.getGenresByGameId(req.params.id);
    res.render("detail", {game , genres});
});