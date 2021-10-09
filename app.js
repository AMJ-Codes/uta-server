require('dotenv').config();
const Express = require('express'); 
const cors=require('cors');
const app = Express();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres'
    }
)

const dbConnection = require("./db"); // connects to database


const controllers = require("./controllers");

// middleware function. Allows req.body. Must go above all other routes. 
app.use(Express.json()); 
app.use(require('./middleware/headers'));
app.use("/user", controllers.userController);
app.use(cors());
app.use(require("./middleware/validate-jwt"));
app.use("/log", controllers.logController);

dbConnection.authenticate()
  .then(() => dbConnection.sync()) 
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is listening on port ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.error(err);
  })
})