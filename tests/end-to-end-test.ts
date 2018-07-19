import * as fs from "fs-extra";
import * as path from "path";
import jsQR from "../src";
import { loadPng } from "../tests/helpers";
import * as helpers from "./helpers";

describe("end to end", async () => {
  const tests = fs.readdirSync(path.join("tests", "end-to-end")).filter((n) => !n.includes("."));
  for (const t of tests) {
    it(t, async () => {
      const inputImage = await helpers.loadPng(path.join("tests", "end-to-end", t, "input.png"));
      const expectedOutput = JSON.parse(await fs.readFile(path.join("tests", "end-to-end", t, "output.json"), "utf8"));
      
      const actualOutput = jsQR(inputImage.data, inputImage.width, inputImage.height);
      const actualColorOutput = JSON.parse(JSON.stringify(jsQR(inputImage.data, inputImage.width, inputImage.height, {retrieveColors: true})));
      expect({default: actualOutput, color: actualColorOutput}).toEqual(expectedOutput);
    });
  }
});
