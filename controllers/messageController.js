const {
    query,
    body,
    validationResult,
    matchedData,
} = require("express-validator");
const db = require("../db/queries");

async function getMessages(req, res) {
    messages = await db.getAllMessages();
    res.render("index", { title: "Mini Messageboard", messages: messages });
}

function getNew(req, res) {
    res.render("new", { title: "New message" });
}

const validateMessage = [
    body("message")
        .isLength({ min: 1, max: 255 })
        .withMessage("Message must be between 1 and 255 characers")
        .escape(),
    body("user")
        .isLength({ min: 1, max: 255 })
        .withMessage("Message must be between 1 and 255 characers")
        .escape(),
];

const postNew = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("/new", {
                title: "New message",
                errors: errors.array(),
            });
        }
        const fields = req.body;
        await db.insertMessage(fields.message, fields.user);
        res.redirect("/");
    },
];

const validateId = query("id").isInt().withMessage("Id must be an integer");

const getMessage = [
    validateId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("message", {
                errors: errors,
                msg: "",
                author: "",
                date: "",
            });
        }
        const message = await db.getMessage(req.query.id);
        if (message.length === 0) {
            return res.render("message", {
                errors: "Message ID not found",
                msg: "",
                author: "",
                date: "",
            });
        }
        res.render("message", {
            errors: "",
            msg: message[0].msg,
            author: message[0].author,
            date: message[0].date,
        });
    },
];

module.exports = {
    getMessages,
    getNew,
    postNew,
    getMessage,
};
