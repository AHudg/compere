const router = require("express").Router();

// back-end request is sent here from server.js

// access to the api subdirectory
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

// uses localhost:PORT/api in the url
router.use("/api", apiRoutes);
// uses localhost:PORT/
router.use("/", homeRoutes);
// uses localhost:PORT/profile in the url
router.use("/dashboard", dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
