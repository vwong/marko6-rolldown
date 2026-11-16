# marko6-rolldown

Minimal repro: `Run.href` is left un-rewritten in the client bundle when `@marko/run` and `vite` resolve different `rolldown` copies. The browser then throws `Run is not defined`.

```sh
npm install
npm ls rolldown   # @marko/run -> 1.3.x, vite -> 1.2.x (two copies)
npm run build
npm run check     # FAIL: un-rewritten Run.href in client chunks
```

Single copy fixes it: add `"overrides": { "rolldown": "<vite's version>" }` to `package.json`, reinstall, rebuild, and `npm run check` prints OK.

Cause: the `marko-run-vite:post` transform returns a `RolldownMagicString` from `@marko/run`'s own `rolldown` as `{ code }`; vite's bundler (a different copy) drops it silently.
