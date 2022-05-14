var connect = require("../utils/Connect");

exports.course = async function getCourse(user) {
    const client = connect.client();
    var response = null;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var dbo = client.db(connect.database());
        var collection = dbo.collection("Cours");
        var result = await collection.find(user).toArray();
        response = {code: 200, data: result, message: null}
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}

exports.quiz = async function getQuiz(user) {
    const client = connect.client();
    var response = null;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var dbo = client.db(connect.database());
        var collection = dbo.collection("Quiz");
        var result = await collection.find(user).toArray();
        response = {code: 200, data: result, message: null}
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}

exports.ecm = async function getEcm() {
    const client = connect.client();
    var response = null;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var dbo = client.db(connect.database());
        var collection = dbo.collection("Ecm");
        var result = await collection.find().toArray();
        response = {code: 200, data: result, message: null}
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}


