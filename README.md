## Mobx Music

Play Music with Mobx

[![CircleCI][circleci-badge]][circleci-href]
[![NPM][npm-version-badge]][npm-href]
[![BundlePhobia][bundlephobia-badge]][bundlephobia-href]

## Install

```sh
  yarn add mobx-music
  # Or
  npm i mobx-music
```

## Usage

```typescript
const { instruments, playingNotes } = await getInstruments(["harmonica"]);
const instrument = instruments.get("harmonica");
instrument.play("A3", 500);
playingNotes.get("A3"); // true
setTimeout(() => {
  instrument.stop("A3");
}, 250);
```

[circleci-href]: https://circleci.com/gh/rakannimer/mobx-music
[circleci-badge]: https://img.shields.io/circleci/project/github/rakannimer/mobx-music.svg
[npm-href]: https://www.npmjs.com/package/mobx-music
[npm-version-badge]: https://img.shields.io/npm/v/mobx-music.svg
[npm-license-badge]: https://img.shields.io/github/license/rakannimer/mobx-music.svg
[bundlephobia-badge]: https://img.shields.io/bundlephobia/minzip/mobx-music.svg
[bundlephobia-href]: https://bundlephobia.com/result?p=mobx-music
