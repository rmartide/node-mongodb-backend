var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }).catch((err) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (todo) {
            res.send(todo);
        } else {
            res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send();
    })

});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo) {
            res.send(todo);
        } else {
            res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var text = req.body.text;
    if (!ObjectID.isValid(id) || !text) {
        return res.status(404).send();
    }
    Todo.findByIdAndUpdate(id, { text: text}).then((todo) => {
        if (todo) {
            res.send(todo);
        } else {
            res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
})

module.exports = { app };