const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
    {
        _id: userOneId,
        email: 'andrew@example.com',
        password: 'userOnePass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'jen@example.com',
        password: 'userTwoPass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
        }]
    }
];

const todos = [{
    text: 'First test todo',
    _id: new ObjectID(12435),
    _creator: userOneId
}, {
    text: 'Second test todo',
    _id: new ObjectID(),
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];


const populateTodos = function () {
    this.timeout(0);
    return Todo.remove({}).then(() =>
        Todo.insertMany(todos)
    )
}

const populateUsers = function () {
    this.timeout(0);
    return User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    })
}

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}