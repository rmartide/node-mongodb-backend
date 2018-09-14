// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    /* 
        db.collection('Todos').findOneAndUpdate(
            { _id: new ObjectID("5b96205f1557d92f6e44ec38") },
            {
                $set: {
                    completed: false
                }
            },
            {
                returnOriginal: false
            }
        ).then((result) => {
            console.log(result);
        })
     */

    db.collection('Users').findOneAndUpdate(
        { _id: new ObjectID("5b9615cd07059440a0290a75") },
        {
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false
        }
    ).then((result) => {
        console.log(result);
    })

    // db.close();
});
