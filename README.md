Certain packages only work when minified.

An example is [@react-three/drei](https://github.com/pmndrs/drei).

To reproduce the issue:

1. `yarn install`
2. `yarn run dev`

Now there is an error rendered: 
Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.

In the console, it says: Identifier 'React' has already been declared.

## Fixing the issue:

Option 1: Very strangely, you can fix the issue by copying the contents of /routes/index.tsx and pasting it into another route like /routes/other-router.tsx. If there are >1 routes that use the affected library it seems to work.

Option 2: Patching remix to minify dev builds
For some reason, if you patch remix to minify dev builds, the issue goes away, (try deleting /routes/other-router.tsx, should still work now)
You can apply the patch with `yarn patch-package`