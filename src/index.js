const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const parseArgs = require('minimist');
const SphericalMercator = new require('@mapbox/sphericalmercator');
const merc = new SphericalMercator({
    size: 256
});
const argv = parseArgs(process.argv.slice(2), opts={});
const divideMetres = argv.u ? parseInt(argv.u) : 1000;

let lon = -87.42461;
let lat = 30.31141;
let x = 0;
let y = 0;

const dataPath = '.';
const loadFiles = argv._.length ? argv._ : [];
const outPath = '.';

// output templates
const vessels = '{"vessels":[{\n';
const positions = '	"positions": [{\n';
const betweenPositions = '	}, {\n';
const endPositions = '	}]\n';
const betweenVessels = '}, {\n';
const vesselString = name => `	"name": "${name}",\n`;
const xString = x => `		"x": ${x},\n`;
const yString = y => `		"y": ${y},\n`;
const timestampString = timestamp => `		"timestamp": "${timestamp}Z"\n`;
const endVessels = '}]}\n';

// input patterns
const idPat = /^\s+"MMSI":\s+"(.+)",$/;
const vesselNamePat = /^\s+"VesselName":\s+"(.*)",$/; // may be empty
const dateTimePat = /^\s+"BaseDateTime":\s+"(.+)",$/;
const lonPat = /^\s+([-]?\d+[\.]?\d*),$/;
const latPat = /^\s+([-]?\d+[\.]?\d*)$/;

async function processLineByLine(fileName) {
  const readFilePath = path.join(dataPath, fileName);
  const inStream = fs.createReadStream(readFilePath);
  const outFileName = argv.o || `out_${fileName}`;
  const writeFilePath = path.join(outPath, outFileName);
  const outStream = fs.createWriteStream(writeFilePath, { flags: 'a'});
  outStream.write(vessels);

  const rl = readline.createInterface({
    input: inStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let matches = [];
  let id = '';
  let vesselId = '';
  let name = '';
  let vesselName = '';
  let timestamp = '';
  let lat = '';
  let lon = '';
  let x = '';
  let y = '';
  rl.on('line', (line) => {
    // console.log(`Line from file: ${line}`);
	debugger;
	matches = idPat.exec(line);
  	if (matches) {
	  id = matches[1];
	  if (vesselId === '') {
	    vesselId = id;
	  }
	}
	matches = vesselNamePat.exec(line);
  	if (matches) {
	  name = matches[1];
	  if (name === '') {
	    name = vesselId;
	  }
	  if (vesselName === '') {
	    vesselName = name;
  		outStream.write(vesselString(vesselName));
  		outStream.write(positions);
	  } else if (vesselName !== name) {
	    vesselName = name;
		// write out the end of the vessel
  	    outStream.write(endPositions);
  		outStream.write(betweenVessels);
  		outStream.write(vesselString(vesselName));
  		outStream.write(positions);
	  } else {
		// not at the end of vessel, so start a new position
  	    outStream.write(betweenPositions);
	  }
	}
	matches = dateTimePat.exec(line);
  	if (matches) {
	  timestamp = matches[1];
	}
	matches = lonPat.exec(line);
  	if (matches) {
	  lon = matches[1];
	}
	matches = latPat.exec(line);
  	if (matches) {
	  lat = matches[1];
	  [x,y] = merc.forward([lon, lat]);
      outStream.write(xString(x / divideMetres));
  	  outStream.write(yString(y / divideMetres));
  	  outStream.write(timestampString(timestamp));
	}
  })
  .on('close', () => {
  	outStream.write(endPositions);
  	outStream.write(endVessels);
    console.log(`Finished writing: ${writeFilePath}`);
  });
}

loadFiles.forEach(file => processLineByLine(file));

