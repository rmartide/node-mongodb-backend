// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    /* insertOneDocument(db, 'Users', {
        name: 'rmartin',
        age: 31,
        location: 'Crevillent'
    }) */

    /* db.collection('Todos').find().toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    })
 */

    /* db.collection('Todos').find().count().then((count) => {
        console.log(`Count: ${count}`);
    }).catch((err)=> {
        console.log('Unable to count');
    }) */

    // db.close();
});

const insertOneDocument = (db, collection, document) => {
    db.collection(collection).insertOne(
        document,
        (err, result) => {
            if (err) {
                return console.log('Unable to insert document', err);
            }
            console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
        }
    );
}