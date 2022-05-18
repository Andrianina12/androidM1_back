var crypto = require('crypto');
var connect = require("../utils/Connect");

exports.insert = async function insert(user) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db(connect.database());
        var collection = dbo.collection("Users");
        user.motdepasse = crypto.createHash('md5').update(user.motdepasse).digest('hex');
        await collection.insertOne(user);
        response = {code: 200, data: null, message: "Inscription reussie"};
    } catch(e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close()
    }
    return response;
}

exports.update = async function update(profil, update) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db(connect.database());
        var collection = dbo.collection("Users");
        await collection.updateOne(profil, {$set: update});
        profil = {
            email: profil.email,
            motdepasse: profil.motdepasse
        }
        const result = await collection.find(profil).toArray();
        response = {code: 200, data: result, message: null}
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}

exports.get = async function get(token) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db(connect.database());
        var collection = dbo.collection("Users");
        token = token.split(" ")[1];
        console.log('token', token)
        const result = await collection.find({token: token}).toArray();
        console.log('result', result);
        if(result.length == 0) response = {code: 401,  data: null, message: "Veuillez vous connecter"};
        else response = {code: 200,  data: result[0], message: null};
    } catch(e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close()
    }
    return response;
}