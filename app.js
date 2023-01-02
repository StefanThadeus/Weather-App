const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const port = 3000;
const apiKey = "583aec310a1bf4ff39f3b6a680631c56";
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey
    https.get(url, (response) => {
      console.log(response.statusCode);

      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The weather currently is " + weatherDescription + ".</p>");
        res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send();
      });
    });
});

app.listen(port, () => {
  console.log("Server is running on port " + port)
});
