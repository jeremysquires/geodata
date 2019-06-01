head -q -n 10 header.csv ais_sorted.csv > h.csv
node ~/Code/geodata/src/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node ~/Code/geodata/src/geojson2shipsim.js -o pos10.json h.json
head -q -n 100 header.csv ais_sorted.csv > h.csv
node ~/Code/geodata/src/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node ~/Code/geodata/src/geojson2shipsim.js -o pos100.json h.json
head -q -n 1000 header.csv ais_sorted.csv > h.csv
node ~/Code/geodata/src/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node ~/Code/geodata/src/geojson2shipsim.js -o pos1000.json h.json
head -q -n 10000 header.csv ais_sorted.csv > h.csv
node ~/Code/geodata/src/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node ~/Code/geodata/src/geojson2shipsim.js -o pos10000.json h.json
head -q -n 100000 header.csv ais_sorted.csv > h.csv
node ~/Code/geodata/src/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node ~/Code/geodata/src/geojson2shipsim.js -o pos100000.json h.json
head -q -n 1000000 header.csv ais_sorted.csv > h.csv
node ~/Code/geodata/src/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node ~/Code/geodata/src/geojson2shipsim.js -o pos1000000.json h.json
head -q -n 10000000 header.csv ais_sorted.csv > h.csv
node ~/Code/geodata/src/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node ~/Code/geodata/src/geojson2shipsim.js -o pos10000000.json h.json
head -q -n 20000000 header.csv ais_sorted.csv > h.csv
node ~/Code/geodata/src/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node ~/Code/geodata/src/geojson2shipsim.js -o pos20000000.json h.json
head -q -n 30000000 header.csv ais_sorted.csv > h.csv
node ~/Code/geodata/src/csv2geojson.js -o h.json --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft h.csv
node ~/Code/geodata/src/geojson2shipsim.js -o pos30000000.json h.json
