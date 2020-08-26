const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const parseArgs = require('minimist');
const argv = parseArgs(process.argv.slice(2), opts={});

const csv2geojson = require('csv2geojson');

const dataPath = '.';
const loadFiles = argv._.length ? argv._ : [];
const outPath = '.';

const initString = `{
  "type": "FeatureCollection",
  "features": [
`;
const endString = `
  ]
}
`;

async function processLineByLine(fileName) {
  const readFilePath = path.join(dataPath, fileName);
  const inStream = fs.createReadStream(readFilePath);
  const outFileName = argv.o || `out_${fileName}`;
  const writeFilePath = path.join(outPath, outFileName);
  const outStream = fs.createWriteStream(writeFilePath, { flags: 'a'});
  if (!argv.ndjson || argv.ndjson !== 'true') {
    outStream.write(initString);
  } else {
    outStream.write('[');
  }

  const rl = readline.createInterface({
    input: inStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let headerLine = '';
  let processLine = '';
  let count = 0;
  outStream.write('[');
  rl.on('line', (line) => {
    // console.log(`Line from file: ${line}`);
    if (headerLine === '') {
      headerLine = line;
      return;
    }
    count += 1;
    processLine = `${headerLine}\n${line}`;
    // console.log(processLine);
    csv2geojson.csv2geojson(processLine, {
      latfield: argv.lat,
      lonfield: argv.lon,
      delimiter: argv.delimiter,
      numericFields: argv['numeric-fields']
    }, function(err, data) {
      if (err) console.error(JSON.stringify(err, null, 2));
      if (argv.line) data = csv2geojson.toLine(data)
      const dataLineString = JSON.stringify(data, null, 2);
      // remove first three lines, last two lines, 
      // removes last CR, and write
      const dataTrimmed = dataLineString
        .match(/^.*([\n\r]+|$)/gm)
        .slice(3,-2)
        .join('')
        .slice(0,-1);
      if (count > 1) {
        outStream.write(',\n');
      }
      outStream.write(dataTrimmed);
    });
  })
  .on('close', () => {
    if (!argv.ndjson || argv.ndjson !== 'true') {
      outStream.write(endString);
    }
    console.log(`Finished writing: ${writeFilePath}`);
  });
}

loadFiles.forEach(file => processLineByLine(file));


