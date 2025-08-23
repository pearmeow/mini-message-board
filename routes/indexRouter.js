const { Router } = require("express");
const messageController = require("../controllers/messageController");

const indexRouter = Router();

indexRouter.get("/", messageController.getMessages);
indexRouter.get("/message", messageController.getMessage);
indexRouter.get("/new", messageController.getNew);
indexRouter.post("/new", messageController.postNew);

module.exports = {
    indexRouter,
};
