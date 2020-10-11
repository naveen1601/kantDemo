
const fs = require("fs");
const files = fs.readdirSync("./images").filter(x => x.includes("jpeg"));
const ex = "{\n" +
files.map(x => `"${x.split(".jpeg")[0]}": require("./${x}"),`).join("\n") + "}";
const res = "export default " + ex;
fs.writeFileSync("./images/index.js", res);