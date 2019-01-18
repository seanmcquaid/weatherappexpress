var express = require('express');
var router = express.Router();
const weatherKey = require("../config");
const request = require("request");
const baseURL = `https://api.openweathermap.org/data/2.5/weather?`;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: "Weather!"
  });
});

router

router.post("/search/weather", (req,res,next)=>{
  const zipCode = req.body.zipCode;
  const searchURL = `${baseURL}zip=${zipCode}&units=imperial&appid=${weatherKey}`;
  request.get(searchURL, (error, response, body)=>{
    const parsedData = JSON.parse(body);
    console.log(parsedData);
    res.render("index", {
      parsedData: parsedData.results,
      name: parsedData.name,
      temperature: parsedData.main.temp,
      iconId: parsedData.weather[0].icon,
    });
  });
})

module.exports = router;
