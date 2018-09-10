const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');


const validId = new ObjectID(12435);

const todos = [{
    text: 'First test todo',
    _id: validId
}, {
    text: 'Second test todo'
}];


beforeEach((done) => {
    Todo.remove({}).then(() =>
        Todo.insertMany(todos)
    ).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'First test todo';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});


describe('GET /todos/:id', () => {
    it('should get todo doc', (done) => {
        request(app)
            .get(`/todos/${validId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
                expect(res.body['_id']).toBe(`${todos[0]['_id']}`);
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        const nonExistentValidId = new ObjectID();
        request(app)
            .get(`/todos/${nonExistentValidId}`)
            .expect(404)
            .end(done);
    })

    it('should return a 404 for non-object ids', (done) => {
        const invalidId = 12345;
        request(app)
            .get(`/todos/${invalidId}`)
            .expect(404)
            .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('should delete todo', (done) => {
        request(app)
            .delete(`/todos/${validId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(validId.toHexString());
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        const nonExistentValidId = new ObjectID();
        request(app)
            .delete(`/todos/${nonExistentValidId}`)
            .expect(404)
            .end(done);
    })

    it('should return a 404 for non-object ids', (done) => {
        const invalidId = 12345;
        request(app)
            .delete(`/todos/${invalidId}`)
            .expect(404)
            .end(done);
    })
});