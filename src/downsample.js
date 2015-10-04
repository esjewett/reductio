var largestTriangleThreeBuckets = require('./largest-triangle-three-buckets');

function downsample(group, p) {
    if (p.downsample) {
        var threshold = p.threshold || 1000;
        var all = group.all;
        group.all = function(){
            return largestTriangleThreeBuckets(all(), p.threshold, p.downsample);
        };
    }
}

var reductio_downsample = {
    build: downsample
};

module.exports = reductio_downsample;
