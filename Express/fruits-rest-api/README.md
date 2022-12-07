# Creating a REST API with Express
## Requirements
1. [Node.js/npm](https://nodejs.org/en/download/)
2. [Curl](https://curl.se/windows/) or [PostMan](https://www.postman.com/downloads/)
3. [Visual Code](https://code.visualstudio.com/download)

## Package.json and installing express
1. Type **`npm init`** to create a package.json file for your project.
2. You can press enter to go through the different items, you can change the entrypoint from `index.js` to `server.js`.
3. Then run the following command **`npm install express cors --save`**.

## Creating application files
1. Open a new terminal and cd into your project and type **`code .`** to open the current directory in Visual Code.
2. In Visual Code, right click on left panel and select `New File`, change the name of the file to `server.js`.
3. Copy the following code in `server.js`
    ```javascript
        const express = require('express');
        const app = express();
        const cors = require('cors');
        const port = process.env.PORT || 3000;

        app.use(cors());

        app.get('/', (req, res) => {
            res.json({ message: 'Home'});
        });

        app.listen(port, () => {
            console.log(`Rest API listening at http://localhost:${port}`)
        });
    ```
4. Run the application with **`node server.js`**, open your browser on this page `http://localhost:3000/`
5. For development purposes you can use nodemon to restart your application when a file is changed, this avoids to stop and start your application everytime you update the files.
   - Install nodemon using **`npm install -g nodemon`**
   - Type **`nodemon server.js`** to run your application.

## Creating REST API
1. Add the following json array after const variables.
    ```javascript
        let fruits = [
                {"id": 1,"title": "Apple"},
                {"id": 2,"title": "Banana"},
                {"id": 3,"title": "Grapefruit"},
                {"id": 4,"title": "Grapes"}
            ];
    ```
2. Add GET route:
    ```javascript
        app.get("/fruits", (req, res) => {
            res.json(fruits);
        });
    ```
3. Browse to `http://localhost:3000/fruits`
4. Add the following method after the json array:
    ```javascript
        const findFruitById = (id) => {
            return Object.values(fruits).find(fruit => fruit.id === id);
        }
    ```
5. Add the next GET route with parameter to find an item by id:
    ```javascript
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
    ```
6. Browse to `http://localhost:3000/fruits/1`, test using several ids and also with words.
7. Add POST route to add new items to array.
    ```javascript
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
    ```
8. Use a client (curl, POSTMAN, etc) to post the request.
   - If you have curl use the following command: 
        ```
        curl -X POST http://localhost:3000/fruits -H "Content-type:application/json" -d "{\"id\":5",\"title\":\"Papaya\"}"
        ```
    > If you are using Linux you can use this format:
    >```
    >    curl -X POST http://localhost:3001/fruits -H "Content-type:application/json" -d '{"id":"5","title":"Papaya"}'
    >```
9. Browse to `http://localhost:3000/fruits/` to check the new item added or use your client for GET requests. (Example: `curl http://localhost:3000/fruits`).
10. You will get an error `TypeError: Cannot read property 'id' of undefined`, you need to add express.json() middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. Add this line after const variables.
    ```javascript
        app.use(express.json());
    ```
11. Retry the POST request from client.
12. Add the next function to modify a current item in array.
    ```javascript
        const modifyFruitById = (id, updatedFruit) => {
            fruits.find(function(fruit, i){
                if(fruit.id === id){
                    fruits[i] =  updatedFruit;
                }
            });
        };
    ```
13. Add PUT route that will accept body data.
    ```javascript
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
    ```
14. Use any client to send the PUT request. 
    - If you have curl use the following command: 
        ```
        curl -X PUT http://localhost:3000/fruits -H "Content-type:application/json" -d "{\"id\":5",\"title\":\"Lemon\"}"
        ```
        
        On Linux:
        ```
        curl -X PUT http://localhost:3000/fruits -H "Content-type:application/json" -d '{"id":"5","title":"Lemon"}'
        ```
15. Browse to `http://localhost:3000/fruits/` to check the modified item or use your client for GET requests. (Example: `curl http://localhost:3000/fruits`).
16. Add the next helper to remove an existing item in the array.
    ```javascript
        const removeFruitById = (id) => {
            let index = -1;
            fruits.find(function(fruit, i){
                if(fruit.id === id){
                    index = i;
                    fruits.splice(i,1);
                }
            })
        }
    ```
17. Add DELETE route accepting a parameter id.
    ```javascript
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
    ```
18. Use any client to send the DELETE request, using the previous item or any item.
    - If you have curl use the following command: 
        ```
        curl -X DELETE http://localhost:3000/fruits/5
        ```
19. Browse to `http://localhost:3000/fruits/` to check the modified item or use your client for GET requests. (Example: `curl http://localhost:3000/fruits`).
