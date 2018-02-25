"use strict";

const Myna = require("myna-parser");
const g = require('../build/heron-parser').heronGrammar;
let m = Myna.Myna;
console.log(m.astSchemaToString('heron'));

process.exit();
