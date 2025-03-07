const Units = require('./units.js');

let unitSystem;

beforeAll(() => {
  unitSystem = new Units();
});

describe("Unit System Tests", () => {

  test("Convert meters to millimeters", () => {
    expect(unitSystem.convert(1, "m", "mm")).toBe(1000);
  });

  test("Convert centimeters to meters", () => {
    expect(unitSystem.convert(100, "cm", "m")).toBe(1);
  });

  test("Convert inches to meters", () => {
    expect(unitSystem.convert(39.37, "in", "m")).toBeCloseTo(1, 2);
  });

  test("Convert feet to meters", () => {
    expect(unitSystem.convert(3.28084, "ft", "m")).toBeCloseTo(1, 2);
  });

  test("Format conversion result", () => {
    expect(unitSystem.format(100, "cm", "m")).toBe("1 m");
  });

  test("Calculate simple sum", () => {
    expect(unitSystem.calculate("1m + 2mm", "mm")).toBe(1002);
  });

  test("Calculate with different unit inputs", () => {
    expect(unitSystem.calculate("1ft + 12in", "m")).toBeCloseTo(0.6096, 2);
  });

  test("Throw error for invalid unit conversion", () => {
    expect(() => unitSystem.convert(1, "m", "kg")).toThrow("Units are not in the same group");
  });

  test("Throw error for unknown unit in calculate", () => {
    expect(() => unitSystem.calculate("1xyz + 2mm", "mm")).toThrow("Unknown unit: xyz");
  });

});
