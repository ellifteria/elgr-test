var renderer_gl;
var ShaderProgram = /** @class */ (function () {
    function ShaderProgram(shaderProgram, bufferDrawHint, bufferPurpose) {
        if (bufferDrawHint === void 0) { bufferDrawHint = renderer_gl.STATIC_DRAW; }
        if (bufferPurpose === void 0) { bufferPurpose = renderer_gl.ARRAY_BUFFER; }
        this.shaderProgram = shaderProgram;
        renderer_gl.useProgram(this.shaderProgram);
        this.attributes = [];
        this.uniforms = [];
        this.attributeLocations = new Map();
        this.uniformLocations = new Map();
        this.vboBufferLocation = renderer_gl.createBuffer();
        if (!this.vboBufferLocation) {
            console.log("Failed to create buffer");
            return;
        }
        renderer_gl.bindBuffer(bufferPurpose, this.vboBufferLocation);
        this.bufferPurpose = bufferPurpose;
        this.bufferDrawHint = bufferDrawHint;
    }
    ShaderProgram.prototype.addAttribute = function (attribute) {
        var attributeLocation = renderer_gl.getAttribLocation(this.shaderProgram, attribute.name);
        if (attributeLocation < 0) {
            console.log("Failed to generate attribute: " + attribute.name);
            return -1;
        }
        this.attributeLocations.set(attribute.name, attributeLocation);
        this.attributes.push(attribute);
        return this.attributes.length - 1;
    };
    ShaderProgram.prototype.addUniform = function (uniform) {
        var uniformLocation = renderer_gl.getUniformLocation(this.shaderProgram, uniform.name);
        if (!uniformLocation) {
            console.log("Failed to generate attribute: " + uniform.name);
            return -1;
        }
        this.uniformLocations.set(uniform.name, uniformLocation);
        this.uniforms.push(uniform);
        return this.uniforms.length - 1;
    };
    ShaderProgram.prototype.loadBufferData = function (bufferData) {
        renderer_gl.bufferData(this.bufferPurpose, bufferData, this.bufferDrawHint);
    };
    ShaderProgram.prototype.setUniform4MatrixFVFromIndex = function (uniformIndex, matrix4FV) {
        renderer_gl.uniformMatrix4fv(this.uniformLocations.get(this.uniforms[uniformIndex].name), false, matrix4FV);
    };
    ShaderProgram.prototype.setUniformMatrix4FVFromData = function (uniformData, matrix4FV) {
        renderer_gl.uniformMatrix4fv(this.uniformLocations.get(uniformData.name), false, matrix4FV);
    };
    ShaderProgram.prototype.setUniformMatrix4FV = function (name, matrix4FV) {
        renderer_gl.uniformMatrix4fv(this.uniformLocations.get(name), false, matrix4FV);
    };
    ShaderProgram.prototype.setUniform1F = function (name, value) {
        renderer_gl.uniform1f(this.uniformLocations.get(name), value);
    };
    ShaderProgram.prototype.setUniform3FV = function (name, values) {
        renderer_gl.uniform3fv(this.uniformLocations.get(name), Float32Array.from(values));
    };
    ShaderProgram.prototype.activate = function () {
        renderer_gl.useProgram(this.shaderProgram);
        renderer_gl.bindBuffer(this.bufferPurpose, this.vboBufferLocation);
        for (var _i = 0, _a = this.attributes; _i < _a.length; _i++) {
            var attribute = _a[_i];
            renderer_gl.vertexAttribPointer(this.attributeLocations.get(attribute.name), attribute.size, attribute.type, attribute.isNormalized, attribute.stride, attribute.offset);
            renderer_gl.enableVertexAttribArray(this.attributeLocations.get(attribute.name));
        }
    };
    return ShaderProgram;
}());
var VertexBufferObject = /** @class */ (function () {
    function VertexBufferObject(floatsPerVertex) {
        if (floatsPerVertex === void 0) { floatsPerVertex = 9; }
        this.vertices = new Float32Array(0);
        this.drawableObjects = new Map();
        this.currentCount = 0;
        this.floatsPerVertex = floatsPerVertex;
    }
    VertexBufferObject.prototype.draw = function (name) {
        var objectData = this.drawableObjects.get(name);
        renderer_gl.drawArrays(objectData.drawingMethod, objectData.start / this.floatsPerVertex, objectData.count / this.floatsPerVertex);
    };
    VertexBufferObject.prototype.addVertices = function (name, vertices, drawingMethod) {
        var newCount = this.currentCount + vertices.length;
        var newVertices = new Float32Array(newCount);
        var i = 0;
        for (i = 0; i < this.currentCount; i++) {
            newVertices[i] = this.vertices[i];
        }
        for (var j = 0; j < vertices.length; j++, i++) {
            newVertices[i] = vertices[j];
        }
        this.drawableObjects.set(name, {
            start: this.currentCount,
            count: vertices.length,
            drawingMethod: drawingMethod
        });
        this.currentCount = newCount;
        this.vertices = newVertices;
    };
    return VertexBufferObject;
}());
function initWebGL() {
    var canvas = document.getElementById("webglCanvas");
    var glContext = WebGLUtils.setupWebGL(canvas, WebGLUtils.WebGLContextType.WebGL);
    if (glContext == null) {
        console.log("Failed to get the rendering context for WebGL");
        return null;
    }
    renderer_gl = glContext;
    return canvas;
}
function createWebGLProgram(vertexShaderSource, fragmentShaderSource) {
    var vertexShader = WebGLUtils.createShader(renderer_gl, WebGLUtils.WebGLShaderType.VertexShader, vertexShaderSource);
    if (vertexShader == null) {
        console.log("Failed to create vertex shader");
        return null;
    }
    var fragmentShader = WebGLUtils.createShader(renderer_gl, WebGLUtils.WebGLShaderType.FragmentShader, fragmentShaderSource);
    if (fragmentShader == null) {
        console.log("Failed to create fragment shader");
        return null;
    }
    var program = WebGLUtils.createProgram(renderer_gl, vertexShader, fragmentShader);
    if (program == null) {
        console.log("Failed to create program");
        return null;
    }
    return [vertexShader, fragmentShader, program];
}