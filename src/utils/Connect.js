const {MongoClient} = require('mongodb');

// const uri = "mongodb+srv://m1p9mean:m1p9mean@cluster0.ljg3b.mongodb.net/m1p9mean?retryWrites=true&w=majority";

const uri = "mongodb+srv://root:root1234@cluster.nnv0o.mongodb.net/android?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017";

function client() {
    return new MongoClient(uri);
}

function database() {
    return "android";
    // return "Android";
}

module.exports = {client, database};