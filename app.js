//listmaker-made with love by Nabanita

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();

const items =["Grow food", "Cook well", "Eat it slow"];
const workItems =[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req,res) {
  //  var currentDay = today.getDay();
  // switch(currentDay)
  // {
  //   case 0:
  //       day = "Sunday";
  //       break;
  //   default:
  //       console.log("Current day is "+ currentDay);
  // }
  const day = date.getDate();
  res.render("list", {ListTitle: day, newListItems: items});
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work",function (req, res) {
    res.render("list", {ListTitle: "Work List", newListItems: workItems})
});

app.post("/work",function (req, res) {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT || 3000,function() {
  console.log("running on 3000");
});
