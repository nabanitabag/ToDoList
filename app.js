//listmaker
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

// const items =["Grow food", "Cook well", "Eat it slow"];
// const workItems =[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-nob:22091998@cluster0.cwbeb.mongodb.net/todolistDB?retryWrites=true&w=majority",{useNewUrlParser:true});

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
  const today = date.getDate();

  Item.find({}, function(err, foundItems) {

    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        }
      });
      res.redirect("/");
    } else {
    res.render("list", {ListTitle: today, newListItems: foundItems});
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });

  if( ){
    item.save();
    res.redirect("/");
      }
    });
  }
  else{
    List.findOne({name:listName}, function (err, foundList) {
      if(err) console.log(err);
      else{
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
  }
});

app.post("/delete", function (req, res) {

  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(){
    List.findOneAndUpdate( {name: listName}, {$pull: {items: {_id: checkedItemId}}}, function (err, foundList) {
      if(err){
        console.log("error here u dumbo");
      } else {
        res.redirect("/"+listName);
      }
    });

  } else {
  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Success in deleting");
      res.redirect("/");
    }
  });
}
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
  const customListName = _.capitalize(req.params.customListName);

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
