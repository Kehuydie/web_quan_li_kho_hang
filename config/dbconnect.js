const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('quanlikhohang', 'root', 'dtth1983', {
        host: '127.0.0.1',
        port:3306,
        dialect: 'mysql'
    });

async function connect(){
    try {
        await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
}

module.exports={
    connect,
    sequelize
}