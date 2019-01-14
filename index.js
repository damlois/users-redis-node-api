const express = require('express');
const fs = require('fs');
const redis = require('redis');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 8700;

const client = redis.createClient();

    client.on('connect', function() {
        console.log('Redis client connected');
    });
    client.on('error', function (err) {
        console.log('Something went wrong ' + err);
    });

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '.txt')
        }
      })
       
const upload = multer({ storage: storage })

// base endpoint
app.get('/', function(req, res) {
    res.json({ message: 'WELCOME' });   
});

//route to upload file to redis
app.post('/upload', upload.single('myFile'),function(req,res){
    console.log(req.file);
    //read file from path and save it to redis database
    const file_path = './uploads/myFile.txt'
    fs.readFile(file_path, function (err, data) {
        if (err) res.send({error : err});

        dataFromFile = data.toString();

        const eachLineArray = dataFromFile.split("\n");
            
        eachLineArray.forEach( (each) => {
            let key = each.split(' ')[0];
            client.set(key,each);
        });  

        res.send({error: false,
                stausCode : 200,
                message : 'File uploaded successfully'});
    });
});

//route to get file from redis
app.get('/msisdn', (req,res) => {
    let id = req.query.id;
    client.get(id.toString(), (err,value) => {
        if(err) res.send({error : err});
        res.send({error : false,
                statusCode: 200,
                data: value});
    });
})

//listening message
app.listen(port, () => {
    console.log(`i am listening on ${port}`)
})