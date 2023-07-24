#!/usr/node
const JSX = async (fileName, outputFileName, config) => {
    config = config ?? {

    };
    const esbuild = require("esbuild");
    const prettier = require("prettier");
    const { externalGlobalPlugin } = require("esbuild-plugin-external-global");
    const { JSDOM } = require("jsdom");
    const path = require("path");
    const fs = require("fs")

    globalThis.React = require('react');
    globalThis.ReactDOM = require("react-dom");

    const result = await esbuild.build({
        entryPoints: [fileName],
        entryNames:"_",
        external: ['react', 'react-dom', ...Object.keys(config.external ?? {})],
        format: "iife",
        globalName: "mainComponent",
        bundle: true,
        write: false,
        outdir:"/",
        sourcemap: "linked",
        treeShaking: true,
        plugins: [
            externalGlobalPlugin({
                'react': 'globalThis.React',
                'react-dom': 'globalThis.ReactDOM',
                ...config.external,
            })
        ],
    });
    const jsFile = result.outputFiles.find(e => e.path === "/_.js");
    const codeString = jsFile.text

    const ReactDOMServer = require("react-dom/server");
    eval(codeString);
    const htmlPage = ReactDOMServer.renderToString(mainComponent.default);

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
    fs.writeFileSync(`${outputFileName}${jsFile.path.replace("/_", "")}`, jsFile.text.replace("//# sourceMappingURL=_", `//# sourceMappingURL=${path.basename(outputFileName)}`));
    page.window.document.querySelector("body").appendChild(script);


    const initScript = page.window.document.createElement("script");
    initScript.text = `ReactDOM.hydrate(mainComponent.default, document);`;
    page.window.document.querySelector("body").appendChild(initScript);

    const html = prettier.format(page.serialize(), { parser: "html" });

    fs.writeFileSync(`${outputFileName}.html`, "<!DOCTYPE html>\n" + html);


    const mapFile = result.outputFiles.find(e => e.path === "/_.js.map");
    const map = JSON.parse(mapFile.text);
    map.sources = map.sources.map((e) => `/${e}`.replace(process.cwd(), ""));
    fs.writeFileSync(`${outputFileName}${mapFile.path.replace("/_", "")}`, JSON.stringify(map, null, 2));
}
module.exports = {
    JSX
}