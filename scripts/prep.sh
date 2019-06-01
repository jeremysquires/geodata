if [ $# -lt 1 ]; then
  echo Usage: $0 ais_raw_data
  exit 0
fi
if [ ! -f $1 ]; then
  echo $1 is not a file 
  exit 0
fi
head -n 1 $1 > header.csv
echo Sorting $1 - this will take a while
sort $1 > ais_sorted.csv
echo Done Sorting, not gzipping $1 - this will take a while
gzip $1
