const express = require('express');
const fs = require('fs');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 8700;

const client = redis.createClient();

    client.on('connect', function() {
        console.log('Redis client connected');
    });
    client.on('error', function (err) {
        console.log('Something went wrong ' + err);
    });

//route to upload file to redis
app.post('/upload', function(req,res){
 
    //read file from path and save it to redis database
    fs.readFile('test.txt', function (err, data) {
        if (err) res.send(err);

        dataFromFile = data.toString();

        const eachLineArray = dataFromFile.split("\n");
            
        eachLineArray.forEach( (each) => {
            let key = each.split(' ')[0];
            client.set(key,each);
        });  

        res.send("File uploaded successfully");
    });
});

//route to get file from redis
app.get('/get/:id', (req,res) => {
    let id = req.params.id;
    client.get(id.toString(), (err,data) => {
        if(err) res.send(err);
        res.send(data);
    });
})

//listening message
app.listen(port, () => {
    console.log(`i am listening on ${port}`)
})