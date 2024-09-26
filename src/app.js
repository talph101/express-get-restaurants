const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get('/restaurants/:id', async(req, res) => {
    const id = req.params.id;
    const data = await Restaurant.findByPk(id);
    res.json(data);
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/restaurants', async (req, res) => {
    try{
        const newData = await Restaurant.create(req.body)
        res.json(newData);
    } catch(error) {
        console.error(error);
    }
});

// app.put('/restaurants/:id', async (req, res) => {
//     try{
//         const id = req.params.id;
//         const newerData = req.body;
//         const data = await Restaurant.findByPk(id);
//         const done = await Restaurant.update(newerData);
//         res.json(data);
//     } catch(err) {
//         console.error(err);
//     }
// })



module.exports = app;