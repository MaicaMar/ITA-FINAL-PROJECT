import { Sequelize } from "sequelize";


const sequelize = new Sequelize('vinyl_collection_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',   
});

export default sequelize;