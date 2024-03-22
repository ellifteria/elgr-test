let WebGLUtils = function () {
    let WebGLContextType;
    (function (WebGLContextType) {
        WebGLContextType[WebGLContextType["WebGL"] = 0] = "WebGL";
        WebGLContextType[WebGLContextType["WebGL2"] = 1] = "WebGL2";
    })(WebGLContextType || (WebGLContextType = {}));
    let WebGLShaderType;
    (function (WebGLShaderType) {
        WebGLShaderType[WebGLShaderType["VertexShader"] = 0] = "VertexShader";
        WebGLShaderType[WebGLShaderType["FragmentShader"] = 1] = "FragmentShader";
    })(WebGLShaderType || (WebGLShaderType = {}));
    var setupWebGL = function (canvas, webglContextType = WebGLContextType.WebGL, contextAttributes) {
        let contextType = (function () {
            switch (webglContextType) {
                case WebGLContextType.WebGL:
                    return "webgl";
                case WebGLContextType.WebGL2:
                    return "webgl2";
            }
        })();
        let context;
        if (typeof (contextAttributes) !== 'undefined') {
            context = canvas.getContext(contextType, contextAttributes);
        }
        else {
            context = canvas.getContext(contextType);
        }
        return context;
    };
    var createShader = function (gl, type, source) {
        let glShaderType = (function () {
            switch (type) {
                case WebGLShaderType.VertexShader:
                    return gl.VERTEX_SHADER;
                case WebGLShaderType.FragmentShader:
                    return gl.FRAGMENT_SHADER;
            }
        })();
        let shader = gl.createShader(glShaderType);
        if (shader === null)
            return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            let compilationError = gl.getShaderInfoLog(shader);
            console.log('Failed tp compile shader: ' + compilationError);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };
    var createProgram = function (gl, vertexShader, fragmentShader) {
        let program = gl.createProgram();
        if (program == null)
            return null;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            let linkError = gl.getProgramInfoLog(program);
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
