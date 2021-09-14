const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let fruits = [
        {"id": 1,"title": "Apple"},
        {"id": 2,"title": "Banana"},
        {"id": 3,"title": "Grapefruit"},
        {"id": 4,"title": "Grapes"}
    ];

const findFruitById = (id) => {
    return Object.values(fruits).find(fruit => fruit.id === id);
}
    
const modifyFruitById = (id, updatedFruit) => {
    fruits.find(function(fruit, i){
        if(fruit.id === id){
            fruits[i] =  updatedFruit;
        }
    });
};

const removeFruitById = (id) => {
    let index = -1;
    fruits.find(function(fruit, i){
        if(fruit.id === id){
            index = i;
            fruits.splice(i,1);
        }
    })
}

app.get('/', (req, res) => {
    res.json({ message: 'Home'});
});

app.get("/fruits", (req, res) => {
    res.json(fruits);
});

app.get("/fruits/:id", (req, res) => {
    var id = parseInt(req.params.id);
    if(!isNaN(id)){
        var fruit = findFruitById(id);
        if(fruit !== null && fruit !==undefined)
            res.json(findFruitById(id));
        else
            res.json({ message: "No fruit was found with that id."});  
    } else {
        res.json({ error: "Id parameter should be a number."});
    }   
});

app.post("/fruits", (req, res) => {

    if(req.body.id){

        var id = parseInt(req.body.id);

        if(!isNaN(id)){

            var fruit = findFruitById(id);

            if(fruit !== null && fruit !==undefined){
                res.json({ message: "This fruit id already exists."}); 
            }
            else {
                fruits.push(req.body);
                res.json({ message: "Fruit was added."});
            }
        } else {
            res.json({ error: "Id parameter should be a number."});
        }   
    } else {
        res.json({ error: "Id is missing in the POST request."});
    }  
});

app.put("/fruits", (req, res) => {

    if(req.body.id){

        var id = parseInt(req.body.id);

        if(!isNaN(id)){

            var fruit = findFruitById(id);

            if(fruit !== null && fruit !==undefined){
                modifyFruitById(id, req.body)
                res.json({ message: "Fruit was modified."});  
            }
            else {
                res.json({ message: "Fruit doesn't exist."}); 
            }
        } else {
            res.json({ error: "Id parameter should be a number."});
        }   
    } else {
        res.json({ error: "Id is missing in the PUT request."});
    }  
});

app.delete("/fruits/:id", (req, res) => {
    
    var id = parseInt(req.params.id);

    if(!isNaN(id)){

        var fruit = findFruitById(id);

        if(fruit !== null && fruit !==undefined){
            removeFruitById(id);
            res.json({ message: "Fruit was deleted."});  
        }
        else{
            res.json({ message: "No fruit was found with that id."});  
        }
    } else {
        res.json({ error: "Id parameter should be a number."});
    }   
});

app.listen(port, () => {
  console.log(`Rest API listening at http://localhost:${port}`)
});