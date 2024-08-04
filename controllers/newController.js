const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.newGameControllerGet = asyncHandler(async (req, res) => {
  const genres = await db.getGenres();
  const developers = await db.getDevelopers();
  const data = { genres: genres, developers: developers };
  res.render("new", { mode: "game", data, error: [] });
});

const validateGame = [
  body("name")
    .trim()
    .isAlphanumeric()
    .withMessage("Name must be alphanumerics only"),
  body("description")
    .trim()
    .isAlphanumeric()
    .withMessage("Description must be alphanumerics only"),
  body("imageurl").isURL().withMessage("Image must be a URL"),
];

exports.newGameControllerPost = [
  validateGame,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const developers = await db.getDevelopers();
    const data = { genres: await db.getGenres(), developers: developers };

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("new", { mode: "game", data, error: errors.array() });
    }
    const { name, description, developer, imageurl, genres } = req.body;
    const game = {
      name: name,
      description: description,
      developer: await db.getDevId(developer),
      image: imageurl,
      genres: await db.getCatId(genres),
    };

    db.addGame(game);
    res.send("yipee");
  }),
];

exports.newGenreControllerGet = asyncHandler(async (req, res) => {
  res.render("new", { mode: "genre", data: [], error: [] });
});

const validateGenre = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Name must be alphabets only")
    .not()
    .isEmpty()
    .withMessage("Name cannot be empty")
    .custom(async (value) => {
      const genres = await db.getGenres();
      if (genres.includes(value)) {
        throw new Error("Genre already exists");
      }
      return true;
    }),
];

exports.newGenreControllerPost = [
  validateGenre,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("new", { mode: "genre", data: [], error: errors.array() });
    }
    try {
      await db.addGenre(req.body.name);
      erro = { msg: "Genre Added successfully" };
      res.status(201).render("new", { mode: "genre", data: [], error: [erro] });
    } catch (err) {
      if (err.code === "23505") {
        erro = { msg: "This genre already exists" };
        res
          .status(400)
          .render("new", { mode: "genre", data: [], error: [erro] });
      } else {
        erro = { msg: "Internal server error" };
        res
          .status(500)
          .render("new", { mode: "genre", data: [], error: [erro] });
      }
    }
  }),
];

exports.newDevControllerGet = asyncHandler(async (req, res) => {
  res.render("new", { mode: "developer", data: [], error: [] });
});

const validateDev = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Name must be alphabets only")
    .not()
    .isEmpty()
    .withMessage("Name cannot be empty")
    .custom(async (value) => {
      const developers = await db.getDevelopers();
      if (developers.includes(value)) {
        throw new Error("Developer already exists");
      }
      return true;
    }),
];

exports.newDevControllerPost = [
  validateDev,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("new", { mode: "developer", data: [], error: errors.array() });
    }
    try {
      await db.addDeveloper(req.body.name);
      erro = { msg: "Developer Added successfully" };
      res.status(201).render("new", { mode: "developer", data: [], error: [erro] });
    } catch (err) {
      if (err.code === "23505") {
        erro = { msg: "This developer already exists" };
        res
          .status(400)
          .render("new", { mode: "developer", data: [], error: [erro] });
      } else {
        erro = { msg: "Internal server error" };
        res
          .status(500)
          .render("new", { mode: "developer", data: [], error: [erro] });
      }
    }
  }),
];
