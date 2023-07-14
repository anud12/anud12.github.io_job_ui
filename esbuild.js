const jsdomPatch = {
    name: "jsdom-patch",
    setup(build) {
        build.onLoad({ filter: /XMLHttpRequest-impl\.js$/ }, async (args) => {
            let contents = await fs.promises.readFile(args.path, "utf8")
            contents = contents.replace(
                'const syncWorkerFile = require.resolve ? require.resolve("./xhr-sync-worker.js") : null;',
                `const syncWorkerFile = "${await requireResolve(
                    "jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js"
                )}";`.replaceAll("\\", process.platform === "win32" ? "\\\\" : "\\")
            )
            return { contents, loader: "js" }
        })
    },
}

require("esbuild").buildSync({
    entryNames: "index.js",
    bundle:true,
    platform: "node",
    outdir: "lib",
    plugins: [jsdomPatch]
})