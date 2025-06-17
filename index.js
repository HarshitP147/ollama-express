// Create an express app that serves ejs files 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ollama = require('ollama');

const app = express();

const instance = new ollama.Ollama();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index', { name: 'Harshit' });
});


app.post("/chat", async (req, res) => {

    const response = await instance.chat({
        model: 'phi4',
        messages: [{
            content: req.body.prompt
        }],
        stream: true
    });

    
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Transfer-Encoding', 'chunked');

    streamResponse(response, res);

    // res.end();
});

// recursive function to handle streaming response
function streamResponse(response, res) {
    response.next().then(({ done, value }) => {
        if (done) {
            res.end();
            return;
        }
        res.write(value.message.content);
        streamResponse(response, res);
    });
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

