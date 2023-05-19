require("@babel/register")({
    plugins: ["@babel/plugin-transform-react-jsx",]
});

const ReactDOMServer = require("react-dom/server");
const babelCore = require("@babel/core");

let result = babelCore.transformFileSync('index.jsx', {
    plugins: ["@babel/plugin-transform-react-jsx",]
});
const babel = require("@babel/core");


console.log(result.code);
const file = ReactDOMServer.renderToString(eval(result.code));
require("fs").writeFileSync("index.html", file);