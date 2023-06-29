#!/usr/node
const JSX = async (fileName, outputFileName, config) => {
    const esbuild = require("esbuild");
    const { externalGlobalPlugin } = require("esbuild-plugin-external-global");
    const { JSDOM } = require("jsdom");
    const path = require("path");

    globalThis.React = require('react');
    globalThis.ReactDOM = require("react-dom");

    const result = await esbuild.build({
        entryPoints: [fileName],
        external: ['react', 'react-dom'],
        format: "iife",
        globalName: "mainComponent",
        bundle: true,
        write: false,
        sourcemap: "inline",
        plugins: [
            externalGlobalPlugin({
                'react': 'globalThis.React',
                'react-dom': 'globalThis.ReactDOM',
            })
        ],
        ...config
    });
    const codeString = result.outputFiles[0].text;

    const ReactDOMServer = require("react-dom/server");
    eval(codeString);
    const htmlPage = ReactDOMServer.renderToString(mainComponent);

    let page = new JSDOM(htmlPage, {
        resources: "usable"
    });

    const reactScript = page.window.document.createElement("script");
    reactScript.setAttribute("src", "https://unpkg.com/react@18/umd/react.production.min.js");
    page.window.document.querySelector("body").appendChild(reactScript);

    const reactDomScript = page.window.document.createElement("script");
    reactDomScript.setAttribute("src", "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js");
    page.window.document.querySelector("body").appendChild(reactDomScript);

    const script = page.window.document.createElement("script");
    script.setAttribute("src", `./${path.basename(outputFileName)}.js`);
    require("fs").writeFileSync(`${outputFileName}.js`, result.outputFiles[0].text)
    page.window.document.querySelector("body").appendChild(script);


    const initScript = page.window.document.createElement("script");
    initScript.text = `ReactDOM.hydrate(mainComponent, document);`;
    page.window.document.querySelector("body").appendChild(initScript);
    require("fs").writeFileSync(`${outputFileName}.html`, "<!DOCTYPE html>\n" + page.serialize());
}
module.exports = {
    JSX
}