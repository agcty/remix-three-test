# Packages like react-three-fiber do not work with remix dev.

## Error Reproduction

```
1. clone this repo
2. pnpm install
3. pnpm run dev
4. Open the browser in incognito mode, otherwise there will be weird errors (seems to be an issue with react 18)
5. Error occurs: Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules. 
Digging into console: Uncaught SyntaxError: Identifier 'React' has already been declared
```

On the other hand, running `pnpm build && pnpm start` works fine, but why?

Try to compare build/index.js after running `pnpm build && pnpm start` and after running `pnpm run dev`.

Both outputs seem to be the same (except a sourcemap comment in the dev output).

In this comment, https://github.com/remix-run/remix/issues/2987#issuecomment-1109989928 it is mentioned that the issue could be because of esbuild.
However, given both outputs are the same, this seems unlikely?


### Related issues
https://github.com/evanw/esbuild/issues/475
https://github.com/remix-run/remix/issues/2987
https://github.com/remix-run/remix/issues/2692#issuecomment-1092961987