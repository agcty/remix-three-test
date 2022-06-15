var esbuild = require("esbuild");
var module$1 = require("module");
const path = require("path");
const fs = require("fs");
var rimraf = require("rimraf");

// let externals = module$1.builtinModules.filter(
//   (mod) => !dependencies$1.includes(mod)
// );

// clean up before build
rimraf.sync(path.resolve(__dirname, "build"));

const reactShim = path.resolve(__dirname, "react-shim.ts");

const entryPoints = {
  "entry.client": "./app/entry.client.tsx",
  root: "./app/root.tsx?browser",
  "routes/index": "./app/routes/index.tsx?browser",
};

function build() {
  esbuild.build({
    entryPoints,
    outdir: "./compile-repro/build",
    platform: "browser",
    format: "esm",
    // external: externals,
    // not using deno, simplifying to always use the shim to bypass referencing config
    inject: [reactShim],
    //   loader: loaders.loaders,
    bundle: true,
    logLevel: "silent",
    splitting: true,
    // change to true
    sourcemap: true,
    metafile: true,
    // changed to true
    incremental: true,
    mainFields: ["browser", "module", "main"],
    treeShaking: true,
    // this is false in dev mode, the mode we want to test
    minify: false,
    entryNames: "[dir]/[name]-[hash]",
    chunkNames: "_shared/[name]-[hash]",
    assetNames: "_assets/[name]-[hash]",
    publicPath: "./compile-repro/build/public",
    //   define: {
    //     "process.env.NODE_ENV": JSON.stringify(options.mode),
    //     "process.env.REMIX_DEV_SERVER_WS_PORT": JSON.stringify(
    //       config.devServerPort
    //     ),
    //   },
  });
}

build();
