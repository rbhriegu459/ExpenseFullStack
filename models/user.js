const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User =sequelize.define('users', {
    name: {type: Sequelize.STRING},
    email:{type: Sequelize.STRING},
    password: {type: Sequelize.STRING}
    }, 
    { timestamps: false} //disables createdat and updatedat
)

module.exports = User;