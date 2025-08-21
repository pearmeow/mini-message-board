const express = require("express");
const path = require("node:path");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
    },
];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/new", (req, res) => {
    console.log(req.body);
    const fields = req.body;
    if (fields.message !== "" && fields.user !== "") {
        messages.push({
            text: fields.message,
            user: fields.user,
            added: new Date(),
        });
    }
    res.redirect("/");
});

app.get("/message", (req, res) => {
    res.render("message", {
        user: req.query.user,
        message: req.query.message,
        added: req.query.added,
    });
});

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app listening on http://127.0.0.1:${PORT}`);
});
