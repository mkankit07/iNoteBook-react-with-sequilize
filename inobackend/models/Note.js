const db = require("../connections/db")
const Sequelize = require('sequelize')

const User = db.define("note", {
    noteId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId:{type:Sequelize.STRING},
    title:{type:Sequelize.STRING},
    description: { type: Sequelize.STRING },
    tags: { type: Sequelize.STRING },
    createdAt: {
        type: Sequelize.DATE,
        default: Date.now()
    },
    updatedAt: {
        type: Sequelize.DATE,
        default: Date.now()
    },
});


module.exports = User





