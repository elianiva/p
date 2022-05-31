# P

> yes, it's just called P as in π because I'm suck at naming things

A website where you can paste code and save it. It's basically like a pastebin clone I don't know how else I would explain it.

This is meant to run on a [Cloudflare Worker](https://www.cloudflare.com/workers/) and it uses [Cloudflare KV](https://developers.cloudflare.com/workers/runtime-apis/kv/) to store the pasted text. The paste result will expires after 7 days to save space.

You can give the url a suffix like a filename and it will highlight them accordingly using [highlight.js](https://github.com/highlightjs/highlight.js). Currently it only support these languages because I intend to use this for my personal needs. It's also reduces the bundle size if I don't import languages that I don't use.

- Typescript/Javascript
- HTML, XML
- CSS
- Markdown
- JSON
- PHP
- Go
- Rust
- Java
- C#
- C++
- Dart
- Python
- Dockerfile
- SQL

I also tried to apply clean architecture for this project. Might be a bit overkill, but I like it overall. Of course it wouldn't be perfect since this is the first time I tried to apply clean architecture so any feedback is more than welcome!

Please don't copy any sensitive information to this website. It's not encrypted and I can definitely see what you paste :p

## Development
If you want to develop this project, make sure you have the wrangler CLI installed. You can install it using `npm` or `cargo` by running these commands.

```bash
# npm
npm i -g wrangler

# cargo
cargo install wrangler
```

Make sure you make a file called `wrangler.toml` based on the example file in this repo and fill the appropriate values. Refer to the [Cloudflare KV Namespace Documentation](https://developers.cloudflare.com/workers/runtime-apis/kv/) for more information about how to set up the namespace.

Then you can run the following command to start the dev server. 

```bash
wrangler dev src/index.ts
```

This project is built using [esbuild](https://esbuild.org/) and tested using [vitest](https://vitest.dev).

## Self Deploy
You can deploy this project to your own instance of Cloudflare Worker using the following command in the project root directory. Make sure you filled the `wrangler.toml` file with the appropriate values.

```bash
wrangler publish
```

If you don't like the defaults such as supported languages, the highlighter, where the pasted text is stored, you can of course adjust them to your likings. 

## License
This project is licensed under the [MIT License](LICENSE).
