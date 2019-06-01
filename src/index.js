const fs = require('fs-extra');
const SphericalMercator = new require('@mapbox/sphericalmercator');

const merc = new SphericalMercator({
    size: 256
});

let lat = -87.42461;
let lon = 30.31141;
let x = 0;
let y = 0;

[x,y] = merc.forward([lat, lon]);

console.log(`x: ${x}, y: ${y}`);
