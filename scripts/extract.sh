GEODATASCRIPTS=`dirname "$0"`
GEODATASRC=$GEODATASCRIPTS/../src
if [ ! -f $GEODATASRC/csv2geojson.js ]; then
  echo $GEODATASRC is not the path to the geodata package
  exit 0
fi
HEADER=header.csv
if [ ! -f $HEADER ]; then
  HEADER=$GEODATASCRIPTS/header.csv
fi

head -n 10 $HEADER ais_sorted.csv | grep -v == > h.csv
node $GEODATASRC/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node $GEODATASRC/geojson2shipsim.js -o pos10.json h.json
head -n 100 $HEADER ais_sorted.csv | grep -v == > h.csv
node $GEODATASRC/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node $GEODATASRC/geojson2shipsim.js -o pos100.json h.json
head -n 1000 $HEADER ais_sorted.csv | grep -v == > h.csv
node $GEODATASRC/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node $GEODATASRC/geojson2shipsim.js -o pos1000.json h.json
head -n 10000 $HEADER ais_sorted.csv | grep -v == > h.csv
node $GEODATASRC/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node $GEODATASRC/geojson2shipsim.js -o pos10000.json h.json
head -n 100000 $HEADER ais_sorted.csv | grep -v == > h.csv
node $GEODATASRC/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node $GEODATASRC/geojson2shipsim.js -o pos100000.json h.json
head -n 1000000 $HEADER ais_sorted.csv | grep -v == > h.csv
node $GEODATASRC/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node $GEODATASRC/geojson2shipsim.js -o pos1000000.json h.json
head -n 10000000 $HEADER ais_sorted.csv | grep -v == > h.csv
node $GEODATASRC/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node $GEODATASRC/geojson2shipsim.js -o pos10000000.json h.json
head -n 20000000 $HEADER ais_sorted.csv | grep -v == > h.csv
node $GEODATASRC/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node $GEODATASRC/geojson2shipsim.js -o pos20000000.json h.json
head -n 30000000 $HEADER ais_sorted.csv | grep -v == > h.csv
node $GEODATASRC/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node $GEODATASRC/geojson2shipsim.js -o pos30000000.json h.json
