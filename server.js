const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const helpers = require("./utils/auth");

// access to controller folder
const controllers = require("./controllers/");

// create the express application
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// tells our handlebars to use our functions created in utils folder
const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// app.use function adds a new middleware to the app; these are executed when a request hits the backend
// express.json() parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
// URL-encoded data will be parsed w/ qs library allowing creation of nested objects from query strings
// and does not filter out ? from the query string
app.use(express.urlencoded({ extended: true }));
// serves static files upon initializing
app.use(express.static(path.join(__dirname, "public")));

// sends to controller directory
app.use(controllers);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}.`));
});
