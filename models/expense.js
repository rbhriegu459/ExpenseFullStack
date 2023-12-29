const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense =sequelize.define('expenses', {
    userId:{type: Sequelize.INTEGER},
    amount: {type: Sequelize.INTEGER},
    description:{type: Sequelize.STRING},
    category: {type: Sequelize.STRING},
    }, 
    { timestamps: false} //disables createdat and updatedat
)

module.exports = Expense;