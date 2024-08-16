const db = require("../db/queries")

module.exports = {
    getIndex: async (req, res) => {
        res.render('index', {title: "Express"})
    },

    getUsernames: async(req, res) => {
        const usernames = await db.getAllUsernames()
        console.log("Usernames: ", usernames);
        res.send("Usernames: " + usernames.map(user => user.username).join(", "));
    },

    createUsernameGet: async(req, res) => {
        // render the form
    },

    createUsernamePost: async(req, res) => {
        const {username} = req.body
        await db.insertUsername(username)
        res.redirect("/")
    },

    findUsername: async (req, res) => {
        const {term} = req.params
        console.log(req.params);
        const results = await db.findUsername(term)
        console.log(results);
        res.send(results)
    },

    deleteAllUsernames: async (req, res) => {
        await db.deleteAllUsernames()
        res.redirect("/")
    }

}