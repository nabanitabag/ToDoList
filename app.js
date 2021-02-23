//listmaker
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');

const app = express();

// const items =["Grow food", "Cook well", "Eat it slow"];
const workItems =[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

const itemSchema = {
  name: String
};

const Item = mongoose.model("item", itemSchema);

const item1 = new Item({
  name: "Welcome to your ToDo list!"
});

const item2 = new Item({
  name: "Hit the + button to add a new line."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("list", listSchema);

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

  Item.find({}, function(err, foundItems) {

    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("success");
        }
      });
      res.redirect("/");
    } else {
    res.render("list", {ListTitle: day, newListItems: foundItems});
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });

  item.save();

  if(req.body.list === "Work"){
    res.redirect("/work");
  }
  else{
    res.redirect("/");
  }
});

app.post("/delete", function (req, res) {

  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (err) {
      console.log(err);
    }else {
      console.log("Success in deleting");
      res.redirect("/");
    }
  });

});
// app.get("/work",function (req, res) {
//     res.render("list", {ListTitle: "Work List", newListItems: workItems})
// });
//
// app.post("/work",function (req, res) {
//     const item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// });

app.get("/:customListName",function (req, res) {
  const customListName = req.params.customListName;

  List.findOne({name: customListName}, function (err, foundList) {
  if (err) {
    console.log(err);
  } else {
    if(!foundList){
      //create a new list
      const list = new List({
        name: customListName,
        items : defaultItems
      });

      list.save();
      res.redirect("/"+customListName);
    }else {
      //create an existing list
      res.render("list", {ListTitle: foundList.name, newListItems: foundList.items});
    }
   }
  })
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT || 3000,function() {
  console.log("running on 3000");
});
