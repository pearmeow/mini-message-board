const pool = require("./pool");

async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}

async function getUsernames(username) {
    const { rows } = await pool.query(
        "SELECT * FROM usernames where username=($1)",
        [username],
    );
    return rows;
}

async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) values($1)", [username]);
}

async function deleteUsernames() {
    await pool.query("DELETE from usernames *");
}

module.exports = {
    getAllUsernames,
    getUsernames,
    insertUsername,
    deleteUsernames,
};
