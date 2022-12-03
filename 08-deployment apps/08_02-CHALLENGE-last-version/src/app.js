const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const port = process.env.PORT || 3000;

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ahmed Eid",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ahmed Eid",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Ahmed Eid",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must provide an address" });
  } else {
    const address = req.query.address;
    geocode(address, (error, { location, lat, long } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(long, lat, (error, forecastData) => {
        if (error) {
          console.log(forecastData, location, address, lat, long);
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ahmed Eid",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ahmed Eid",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + " " + port);
});
