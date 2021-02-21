const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let items =["Grow food", "Cook well", "Eat it slow"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req,res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);
  //  var currentDay = today.getDay();
  // switch(currentDay)
  // {
  //   case 0:
  //       day = "Sunday";
  //       break;
  //   default:
  //       console.log("Current day is "+ currentDay);
  // }
  res.render("list", {kindOfDay: day, newListItems: items});
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function() {
  console.log("running on 3000");
});
