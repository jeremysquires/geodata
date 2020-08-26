# geodata

Process AIS - Automatic Identification System ship positioning data into a truncated format for input to [shipsim](https://github.com/jeremysquires/shipsim) ship simulator as a load test.

The command line tool csv2geojson provided here is intended as a replacement for [csv2geojson](http://mapbox.github.io/csv2geojson/) from mapbox for datasets that are too large for that tool to perform well against. A few extra features are added. TODO: Rename this tool so it's name does not collide with mapbox's tool.

## Quick Start

* Download one of the CSV format AIS datasets and unzip it
  * [USA AIS Data](https://marinecadastre.gov/ais/) post 2015 is in CSV
  * Convert one of the other formats to CSV using GDAL as described below
* Download or clone this repo
  * `git clone git@github.com:jeremysquires/geodata.git`
* Copy the scripts into the folder with the dataset and run them
  * `cp scripts/*.sh <data_folder>`
  * `./prep.sh <input_csv_file>`
    * pulls out the header, sorts, and gzips ais_sorted.csv
  * `./extract.sh`
    * pulls varying numbers of lines out of ais_sorted.csv and converts them to geojson

## csv2geojson Command Line

All command line arguments for [csv2geojson](http://mapbox.github.io/csv2geojson/) are passed to the tool.

Additional command line arguments:

* `-o <output_filename>`
  * open an output file for all output
* `--ndjson <true|false>`
  * output newline delimited json
* `--alt <altitude_field>`
  * adds an altitude coordinate to the geojson coords

## Background

AIS systems record position and other properties of ship movements in real time from low cost broadcasting sensors aboard ships.

Governments, commercial providers, and even volunteer groups collate this data and provide it to shipping concerns and individual ships for the purposes of voyage planning, scheduling, collision avoidance, rescue and research.

The US and Australian governments provide historical AIS data for free in a variety of formats. From 2015 onwards, the USA data sets are provided in CSV, making them easier to process. The Australian data sets and the USA data sets before 2015 are in ESRI File Geodatabase format which can be converted to other formats using [GDAL](https://www.osgeo.org/projects/gdal/), in particular, using the [ogr2ogr](https://github.com/OSGeo/gdal) command line.

* Example: `ogr2ogr -overwrite -f CSV "test.csv" "test.gdb" "test_layer"`

Once the data is in CSV format, converting it to GeoJSON or some other format is a straight forward mapping of headers to field keys in the target format.

* Example: `csv2geojson --lat LAT --lon LON --numeric-fields SOG,COG,Heading,Length,Width,Draft head1000.csv > head1000.json`

## References

* [AIS Data Source Listing](https://mods.marin.nl/plugins/servlet/mobile?contentId=28770764#content/view/28770764)
* [USA AIS Data](https://marinecadastre.gov/ais/)
* [Australian AIS Data](https://en.wikipedia.org/wiki/Automatic_identification_system)

## Additional Tools

If [Newline Delimitted JSON](http://ndjson.org/) is required, install some tools to handle that.

* [geojson2ndjson](https://www.npmjs.com/package/geojson2ndjson)
  * Command line tool for converting to and from JSONL/NDJSON and GeoJSON
  * `npm install -g geojson2ndjson`
* [ndjson-cli](https://www.npmjs.com/package/ndjson-cli)
  * Command line tool for handling JSONL/NDJSON
  * `npm install -g ndjson-cli`
