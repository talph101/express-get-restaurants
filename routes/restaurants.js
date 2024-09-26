const express = require("express");
const router = express.Router();

router.get("/restaurants", async (req, res) => {
    const rests = await Restaurant.findAll();
    res.json(rests);
})

router.get('/restaurants/:id', async(req, res) => {
    const id = req.params.id;
    const data = await Restaurant.findByPk(id);
    res.json(data);
})

router.post('/', async (req, res) => {
    try{
        const newData = await Restaurant.create(req.body)
        res.json(newData);
    } catch(error) {
        console.error(error);
    }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {    
    try{
        const data = await Restaurant.findByPk(req.params.id);
        data.destroy()
        res.json(data);
        
    } catch {
        console.error("This is an error for app.delete.")
    }
});


module.exports = router;