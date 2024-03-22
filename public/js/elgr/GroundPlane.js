var GroundPlane = /** @class */ (function () {
    function GroundPlane(sinIterations, numXLines, numYLines, frequency, floatsPerVertex, worldSize, height) {
        if (sinIterations === void 0) { sinIterations = 7; }
        if (numXLines === void 0) { numXLines = 50; }
        if (numYLines === void 0) { numYLines = numXLines; }
        if (frequency === void 0) { frequency = 0.025; }
        if (floatsPerVertex === void 0) { floatsPerVertex = 7; }
        if (worldSize === void 0) { worldSize = 250; }
        if (height === void 0) { height = 1; }
        this.sinIterations = sinIterations;
        this.numXLines = numXLines;
        this.numYLines = numYLines;
        this.frequency = frequency;
        this.floatsPerVertex = floatsPerVertex;
        this.worldSize = worldSize;
        this.height = height;
        this.vertices = new Float32Array(0);
    }
    GroundPlane.prototype.calculateHeightAtPoint = function (x, y) {
        var result = 0;
        for (var i = 0; i < this.sinIterations; i++) {
            result += Math.pow(2, -i) * Math.sin(this.frequency * Math.pow(2, i) * x);
        }
        for (var i = 0; i < this.sinIterations; i++) {
            result += Math.pow(2, -i) * Math.sin(this.frequency * Math.pow(2, i) * y);
        }
        return result;
    };
    GroundPlane.prototype.makeGroundGrid = function () {
        var xColor = new Float32Array([240 / 255, 174 / 255, 207 / 255]);
        var yColor = new Float32Array([240 / 255, 174 / 255, 207 / 255]);
        var numVertices = (2 * this.numYLines - 2) * this.numXLines + (2 * this.numXLines - 2) * this.numYLines;
        this.vertices = new Float32Array(numVertices * this.floatsPerVertex);
        var xGap = 2 * this.worldSize / this.numXLines;
        var yGap = 2 * this.worldSize / this.numYLines;
        var j = 0;
        for (var xIndex = 0; xIndex < this.numXLines; xIndex++) {
            for (var yIndex = 0; yIndex < this.numYLines; yIndex++) {
                var x = -this.worldSize + xIndex * xGap;
                var y = -this.worldSize + yIndex * yGap;
                var z = this.height * this.calculateHeightAtPoint(x, y);
                this.vertices[j] = x;
                this.vertices[j + 1] = y;
                this.vertices[j + 2] = z;
                this.vertices[j + 3] = 1.0;
                this.vertices[j + 4] = xColor[0];
                this.vertices[j + 5] = xColor[1];
                this.vertices[j + 6] = xColor[2];
                j += this.floatsPerVertex;
                if (yIndex != 0 && yIndex != this.numYLines - 1) {
                    this.vertices[j] = x;
                    this.vertices[j + 1] = y;
                    this.vertices[j + 2] = z;
                    this.vertices[j + 3] = 1.0;
                    this.vertices[j + 4] = yColor[0];
                    this.vertices[j + 5] = yColor[1];
                    this.vertices[j + 6] = yColor[2];
                    j += this.floatsPerVertex;
                }
            }
        }
        for (var yIndex = 0; yIndex < this.numYLines; yIndex++) {
            for (var xIndex = 0; xIndex < this.numXLines; xIndex++) {
                var x = -this.worldSize + xIndex * xGap;
                var y = -this.worldSize + yIndex * yGap;
                var z = this.height * this.calculateHeightAtPoint(x, y);
                this.vertices[j] = x;
                this.vertices[j + 1] = y;
                this.vertices[j + 2] = z;
                this.vertices[j + 3] = 1.0;
                this.vertices[j + 4] = yColor[0];
                this.vertices[j + 5] = yColor[1];
                this.vertices[j + 6] = yColor[2];
                j += this.floatsPerVertex;
                if (xIndex != 0 && xIndex != this.numXLines - 1) {
                    this.vertices[j] = x;
                    this.vertices[j + 1] = y;
                    this.vertices[j + 2] = z;
                    this.vertices[j + 3] = 1.0;
                    this.vertices[j + 4] = yColor[0];
                    this.vertices[j + 5] = yColor[1];
                    this.vertices[j + 6] = yColor[2];
                    j += this.floatsPerVertex;
                }
            }
        }
        return this.vertices;
    };
    return GroundPlane;
}());