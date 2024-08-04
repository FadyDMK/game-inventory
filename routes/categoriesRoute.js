const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");


router.get("/genres", categoriesController.genresControllerGet);
router.get("/developers", categoriesController.developersControllerGet);
router.get("/all", categoriesController.allGamesControllerGet);
router.get("/genre", categoriesController.genreGamesControllerGet);
router.get("/developer", categoriesController.developerGamesControllerGet);
module.exports = router;