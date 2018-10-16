import { getInstruments } from "../src/";

const main = async () => {
  console.log("Hello");
  const { instruments } = await getInstruments(["accordion"]);
  instruments.get("accordion").play("A4", { duration: 1000 });
};
(async () => {
  await main();
})();
