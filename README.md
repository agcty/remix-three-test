Certain packages only work when minified.

An example is [@react-three/drei](https://github.com/pmndrs/drei).

To reproduce the issue:

1. `yarn install`
2. `yarn run dev`

Now there is an error rendered: 
Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.

In the console, it says: Identifier 'React' has already been declared.

Fixing the issue:

1. `yarn patch-package`