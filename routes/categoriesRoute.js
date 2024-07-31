const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");


router.get("/genres", categoriesController.genresControllerGet);
router.get("/developers", categoriesController.developersControllerGet);
router.get("/all", categoriesController.allGamesControllerGet);
module.exports = router;