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

app.put('/restaurants/:id', async (req, res) => {
    try {
        const thisId = req.params.id;
        const newerData = req.body;
        await Restaurant.update(newerData, {where: {id : thisId} });
        const data = await Restaurant.findByPk(thisId);
        res.json(data);
    } catch(err) {
        console.error(err);
    }
})

app.delete('/restaurants/:id', async (req, res) => {    
    try{
        const data = await Restaurant.findByPk(req.params.id);
        data.destroy()
        res.json(data);
        
    } catch {
        console.error("This is an error for app.delete.")
    }
});


module.exports = app;