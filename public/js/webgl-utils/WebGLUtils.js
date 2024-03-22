var WebGLUtils = function () {
    var WebGLContextType;
    (function (WebGLContextType) {
        WebGLContextType[WebGLContextType["WebGL"] = 0] = "WebGL";
        WebGLContextType[WebGLContextType["WebGL2"] = 1] = "WebGL2";
    })(WebGLContextType || (WebGLContextType = {}));
    var WebGLShaderType;
    (function (WebGLShaderType) {
        WebGLShaderType[WebGLShaderType["VertexShader"] = 0] = "VertexShader";
        WebGLShaderType[WebGLShaderType["FragmentShader"] = 1] = "FragmentShader";
    })(WebGLShaderType || (WebGLShaderType = {}));
    var setupWebGL = function (canvas, webglContextType, contextAttributes) {
        if (webglContextType === void 0) { webglContextType = WebGLContextType.WebGL; }
        var contextType = (function () {
            switch (webglContextType) {
                case WebGLContextType.WebGL:
                    return "webgl";
                case WebGLContextType.WebGL2:
                    return "webgl2";
            }
        })();
        var context;
        if (typeof (contextAttributes) !== 'undefined') {
            context = canvas.getContext(contextType, contextAttributes);
        }
        else {
            context = canvas.getContext(contextType);
        }
        return context;
    };
    var createShader = function (gl, type, source) {
        var glShaderType = (function () {
            switch (type) {
                case WebGLShaderType.VertexShader:
                    return gl.VERTEX_SHADER;
                case WebGLShaderType.FragmentShader:
                    return gl.FRAGMENT_SHADER;
            }
        })();
        var shader = gl.createShader(glShaderType);
        if (shader === null)
            return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            var compilationError = gl.getShaderInfoLog(shader);
            console.log('Failed tp compile shader: ' + compilationError);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };
    var createProgram = function (gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        if (program == null)
            return null;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            var linkError = gl.getProgramInfoLog(program);
            console.log('Failed to link program: ' + linkError);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            return null;
        }
        return program;
    };
    return {
        WebGLContextType: WebGLContextType,
        WebGLShaderType: WebGLShaderType,
        setupWebGL: setupWebGL,
        createShader: createShader,
        createProgram: createProgram,
    };
}();