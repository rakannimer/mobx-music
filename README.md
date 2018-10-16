## Mobx Music

Play Music with Mobx

## Install

```sh
  yarn add mobx-music
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
