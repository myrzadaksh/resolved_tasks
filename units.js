class Unit {
    constructor(name, symbol, toBaseCoeff, group) {
      this._name = name;
      this._symbol = symbol;
      this._toBaseCoeff = toBaseCoeff;
      this._group = group;
    }
  
    get name() {
      return this._name;
    }
  
    get symbol() {
      return this._symbol;
    }
  
    get toBaseCoeff() {
      return this._toBaseCoeff;
    }
  
    get group() {
      return this._group;
    }
  }
  
  class Units {
    constructor() {
      this._units = {};
      this.initializeUnits();
    }
  
    addUnit(unit) {
      this._units[unit.name] = unit;
    }
  
    initializeUnits() {
      // Length Units
      this.addUnit(new Unit("meter", "m", 1, "length"));
      this.addUnit(new Unit("centimeter", "cm", 0.01, "length"));
      this.addUnit(new Unit("millimeter", "mm", 0.001, "length"));
      this.addUnit(new Unit("inch", "in", 0.0254, "length"));  // 1 inch = 0.0254 meters
      this.addUnit(new Unit("foot", "ft", 0.3048, "length"));  // 1 foot = 0.3048 meters
  
      // Mass Units
      this.addUnit(new Unit("gram", "g", 0.001, "mass"));
      this.addUnit(new Unit("kilogram", "kg", 1, "mass"));
      this.addUnit(new Unit("ton", "t", 1000, "mass"));
    }
  
    convert(value, inputUnit, outputUnit) {
      if (!this._units[inputUnit] || !this._units[outputUnit]) {
        throw new Error("Invalid unit");
      }
  
      if (this._units[inputUnit].group !== this._units[outputUnit].group) {
        throw new Error("Units are not in the same group");
      }
  
      const baseValue = value * this._units[inputUnit].toBaseCoeff;
      return baseValue / this._units[outputUnit].toBaseCoeff;
    }
  
    format(value, inputUnit, outputUnit) {
      return `${this.convert(value, inputUnit, outputUnit)} ${this._units[outputUnit].symbol}`;
    }
  
    getUnits(group) {
      return Object.values(this._units)
        .filter((unit) => unit.group === group)
        .map((unit) => unit.name);
    }
  
    getGroups() {
      const groups = Object.values(this._units).map((unit) => unit.group);
      return [...new Set(groups)];
    }
  
    calculate(expression, outputUnit) {
      const regex = /(\d+(\.\d+)?)\s*([a-zA-Z]+)/g;
      let match;
      let total = 0;
  
      while ((match = regex.exec(expression)) !== null) {
        const value = parseFloat(match[1]);
        const unit = match[3];
  
        if (!this._units[unit]) {
          throw new Error(`Unknown unit: ${unit}`);
        }
  
        if (this._units[unit].group !== this._units[outputUnit].group) {
          throw new Error("Units must be in the same group");
        }
  
        total += value * this._units[unit].toBaseCoeff;
      }
  
      return total / this._units[outputUnit].toBaseCoeff;
    }
  }
  
  module.exports = Units;
  