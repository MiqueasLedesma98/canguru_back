const { readFileSync } = require("fs");
const path = require("path");
const { compile } = require("handlebars");

module.exports = {
  generateTemplateHtml: (name) => {
    const sourcePath = path.join(__dirname, "..", `email/${name}.hbs`);
    const source = readFileSync(sourcePath, "utf-8");
    return compile(source);
  },
};
