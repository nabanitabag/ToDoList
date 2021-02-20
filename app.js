const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get("/", function (req,res) {

  var today = new Date();

  if(today.getDay()===6 || today.getDay() === 0){
    res.send("Yay, it's the weekend.")
  }
  else{
  res.send("It's a workday.");
  }
});

app.listen(process.env.PORT || 3000,function() {
  console.log("running on 3000");
});
