const sequelize = require("../config/sequelize");
const {DataTypes, Sequelize} = require("sequelize");

const user = sequelize.define("User", {
    id : {
        primaryKey : true,
        type : DataTypes.INTEGER,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    role : {
        type : DataTypes.ENUM("admin", " user"),
        allowNull : false, 
    }
});


module.exports = user;