import { getInstruments, InstrumentName } from "../src/";

const playNote = async (instrumentName: InstrumentName) => {
  const { instruments } = await getInstruments([instrumentName]);
  await instruments.get(instrumentName).play("A4", { duration: 1000 });
};

const main = async () => {
  console.log("Hello");
  const selectedInstrumentInput = document.getElementById(
    "selected-instrument"
  );

  // console.log(selectedInstrumentInput);
  selectedInstrumentInput.addEventListener("change", async ev => {
    const selectedInstrumentElement = ev.currentTarget as HTMLSelectElement;
    const newInstrumentName = selectedInstrumentElement.value as InstrumentName;
    await playNote(newInstrumentName);
  });
  await playNote("accordion");
};

(async () => {
  await main();
})();
