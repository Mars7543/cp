var bodyParser = require("body-parser"),
    express    = require("express"),
    app        = express();

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.render("home", {cp: "n"}); 
});

app.get("/charity", function(req, res){
   res.render("charity", {cp: "c"}); 
});

app.get("/programmer", function(req, res){
   res.render("programmer", {cp: "p"}); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CharityProgrammers running...");
});