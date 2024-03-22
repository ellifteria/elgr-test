;
function printNode(markerStr, value, levelMarkers) {
    var emptyStr = " ".repeat(markerStr.length);
    var connectionString = "|".concat(" ".repeat(markerStr.length - 1));
    var level = levelMarkers.length;
    var mapper = function (draw) {
        if (draw) {
            return connectionString;
        }
        else {
            return emptyStr;
        }
    };
    var markers = "".concat(levelMarkers.slice(0, -1).map(mapper).join(""));
    if (level > 0) {
        markers = markers.concat(markerStr);
    }
    console.log("".concat(markers).concat(value));
    return level;
}
var DrawNode = /** @class */ (function () {
    function DrawNode(name, drawFunction) {
        this.name = name;
        this.drawFunction = drawFunction;
    }
    DrawNode.prototype.traverseNode = function (worldMatrix, parameters) {
        var childWorldMatrix = glMatrix.mat4.clone(worldMatrix);
        this.drawFunction(childWorldMatrix, parameters);
    };
    DrawNode.prototype.printNode = function (markerStr, levelMarkers) {
        printNode(markerStr, this.name, levelMarkers);
    };
    return DrawNode;
}());
var TransformationNode = /** @class */ (function () {
    function TransformationNode(name, transformationFunction, child) {
        this.name = name;
        this.transformationFunction = transformationFunction;
        this.child = child;
    }
    TransformationNode.prototype.printNode = function (markerStr, levelMarkers) {
        printNode(markerStr, this.name, levelMarkers);
        this.child.printNode(markerStr, levelMarkers.concat(false));
    };
    ;
    TransformationNode.prototype.traverseNode = function (worldMatrix, parameters) {
        var childWorldMatrix = glMatrix.mat4.clone(worldMatrix);
        this.transformationFunction(childWorldMatrix, worldMatrix, parameters);
        this.child.traverseNode(childWorldMatrix, parameters);
    };
    return TransformationNode;
}());
var GroupNode = /** @class */ (function () {
    function GroupNode(name, children) {
        this.name = name;
        this.children = children;
    }
    GroupNode.prototype.printNode = function (markerStr, levelMarkers) {
        printNode(markerStr, this.name, levelMarkers);
        var numChildren = this.children.length;
        for (var i = 0; i < numChildren; i++) {
            var isLast = (i == numChildren - 1);
            this.children[i].printNode(markerStr, levelMarkers.concat(!isLast));
        }
    };
    ;
    GroupNode.prototype.traverseNode = function (worldMatrix, parameters) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var childWorldMatrix = glMatrix.mat4.clone(worldMatrix);
            child.traverseNode(childWorldMatrix, parameters);
        }
    };
    return GroupNode;
}());
var BaseNode = /** @class */ (function () {
    function BaseNode(name, baseWorldMatrix, child) {
        this.name = name;
        this.baseWorldMatrix = baseWorldMatrix;
        this.child = child;
    }
    BaseNode.prototype.printNode = function (markerStr, _levelMarkers) {
        this.child.printNode(markerStr, []);
    };
    ;
    BaseNode.prototype.traverseNode = function (_worldMatrix, parameters) {
        var childWorldMatrix = glMatrix.mat4.clone(this.baseWorldMatrix);
        this.child.traverseNode(childWorldMatrix, parameters);
    };
    BaseNode.prototype.traverseGraph = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        this.traverseNode(null, parameters);
    };
    BaseNode.prototype.printGraph = function () {
        this.printNode("+- ", null);
    };
    return BaseNode;
}());