let express = require('express');
let fetch = require('node-fetch');

let app = express();

app.get('/test/api', (req, res) => {
    setTimeout(() => {
        res.json({
            type: "GET",
            name: "Varma",
            file: "test"
        });
    }, 5000 );

});

app.listen(3000, () => {
    console.log("Listening to http://127.0.0.1:3000")
});

app.get('/test/fetch', (req, res) => {
    let url = 'http://127.0.0.1:3000/test/api';
    
    async function getData(link){
        let data = await fetch(link);
        return data.json();
    }

    getData(url).then(function(d){
        console.log(d);
        res.send(d);
    })
    .catch(function(err){
        console.log(err);
    });

});















