const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require('cors');


// repository
const user = require("./src/repository/Users");
const login = require("./src/repository/Login");
const global = require("./src/repository/Global");

app.use(cors({
    origin: '*'
  }));
  
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add router in the Express app.
app.use("/", router);

// use the express-static middleware
app.use(express.static("public"))

// define the first route
router.get("/", function (req, res) {
res.send("<h1>Hello World!</h1>")
})

  // start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));


  //login
  router.post("/login", async function(req, res){
    var response = await login.login(req.body);
    res.json(response);
  });

  // User
  router.post("/insertUser", async function(req, res){
    console.log("req", req.body);
    var response = await user.insert(req.body);
    res.json(response);
  });

  router.put("/updateUser", async function(req, res){
    console.log("req", req.body);
    var response = null;
    var token = req.headers.authorization;
    response =  await login.verifyToken(token);
    if(response.data == null) {
      response = await user.update(response[0], req.body);
    }
    res.json(response);
  });


  // Global
  router.post("/course", async function(req, res){
    console.log("req", req.body);
    var response = null;
    var token = req.headers.authorization;
    response =  await login.verifyToken(token);
    if(response.data == null) {
      response = await global.course(req.body);
    }
    res.json(response);
  });

  router.post("/quiz", async function(req, res){
    console.log("req", req.body);
    var response = null;
    var token = req.headers.authorization;
    response =  await login.verifyToken(token);
    if(response.data == null) {
      response = await global.quiz(req.body);
    }
    res.json(response);
  });

  router.get("/ecm", async function(req, res){
    console.log("req", req.body);
    var response = null;
    var token = req.headers.authorization;
    response =  await login.verifyToken(token);
    if(response.data == null) {
      response = await global.ecm();
    }
    res.json(response);
  });