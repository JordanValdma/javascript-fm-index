document.write('input length is ' + data.length + '<br>');

var start = new Date().getTime();
var result = BWTransform(data);
var end = new Date().getTime();
var time = end - start;

document.write('bwt string generation in ' + time + ' milliseconds<br>');

start = new Date().getTime();
var fm = new FmIndex(result.bwtStr, result.indexes);
end = new Date().getTime();
time = end - start;

document.write('fm-index generation in ' + time + ' milliseconds<br>');

start = new Date().getTime();
var count = fm.count('ACGTA');
end = new Date().getTime();
time = end - start;

document.write('count size result is ' + count + '<br>');

document.write('count query in  ' + time + ' milliseconds<br>');

