const express = require("express");
const router = express.Router();
const newController = require("../controllers/newController");

router.get("/game", newController.newGameControllerGet);
router.post("/game", newController.newGameControllerPost);

router.get("/genre", newController.newGenreControllerGet);
router.post("/genre", newController.newGenreControllerPost);

router.get("/developer", newController.newDevControllerGet);
router.post("/developer", newController.newDevControllerPost);

module.exports = router;