const express = require('express');
require('dotenv').config()
const cors=require('cors')
const app = express();
const db = require("./connections/db");

app.use(cors())
app.use(express.json())
app.use("/",require("./routes/index"))
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

db.sync().then(() => {
    app.listen(process.env.PORT, (err) => {
        if (err) {
            // throw err
            console.log("error");
        } else {
            console.log(`your app is running on PORT : ${process.env.PORT}`);
            console.log(`api url: http://localhost:${process.env.PORT}`)
        }
    })
}).catch(err => console.log("Error: " + err));