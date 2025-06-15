// Create an express app that serves ejs files 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('index', { name: 'User' });
});


app.post("/chat", (req, res) => {
    console.log(req.body);
    let prompt = req.body;
    console.log(prompt);
    res.json({
        message: `You said: ${prompt.message}`,
        status: 'success'
    }).redirect('/')
})


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

