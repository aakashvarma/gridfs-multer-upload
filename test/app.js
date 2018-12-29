let express = require('express');
let fetch = require('node-fetch');

let app = express();

// Middleware

app.set('view engine', 'ejs');


// app.get('/', (req, res) => {
//     res.render('index');
// });

app.get('/test/api', (req, res) => {
    setTimeout(() => {
        res.json({
            type: "GET",
            name: "Varma",
            file: "test",
            menu: [
                { name: 'Bloody Mary', drunkness: 3 },
                { name: 'Martini', drunkness: 5 },
                { name: 'Scotch', drunkness: 10 }
            ]
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
        res.render('index', d);         // rendered html page here
    })
    .catch(function(err){
        console.log(err);
    });

});















