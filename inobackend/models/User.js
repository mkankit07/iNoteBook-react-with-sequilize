const db = require("../connections/db")
const Sequelize = require('sequelize')

const User = db.define("user", {
    userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name:{type:Sequelize.STRING},
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
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





