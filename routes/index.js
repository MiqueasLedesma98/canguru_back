// Library
const fs = require("fs");

// Files on the folder
const files = fs.readdirSync(__dirname);

// Identifier
const isRoute = ".routes.js";

// Route names to export;
const routes = {};

// Register routes for export
files.forEach((file) => {
  if (file.endsWith(isRoute)) {
    const routeName = file.replace(isRoute, "");
    routes[routeName] = require(`./${file}`);
  }
});

module.exports = routes;
