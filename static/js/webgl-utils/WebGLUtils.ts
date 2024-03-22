let WebGLUtils = function() {
    enum WebGLContextType {
        WebGL,
        WebGL2
    }

    enum WebGLShaderType {
        VertexShader,
        FragmentShader
    }

    var setupWebGL = function(canvas:  HTMLCanvasElement, webglContextType: WebGLContextType = WebGLContextType.WebGL, contextAttributes?: Object): WebGLRenderingContext | WebGL2RenderingContext | null {
        let contextType: string = (function() {
            switch(webglContextType) {
                case WebGLContextType.WebGL:
                    return "webgl";
                case WebGLContextType.WebGL2:
                    return "webgl2";
            }
        })();

        let context: WebGLRenderingContext | WebGL2RenderingContext | null;
        if (typeof(contextAttributes) !== 'undefined') {
            context = <WebGLRenderingContext | WebGL2RenderingContext | null>canvas.getContext(contextType, contextAttributes);
        } else {
            context = <WebGLRenderingContext | WebGL2RenderingContext | null>canvas.getContext(contextType);
        }

        return context;
    };

    var createShader = function(gl: WebGL2RenderingContext | WebGLRenderingContext, type: WebGLShaderType, source: string): WebGLShader | null {
        let glShaderType = (function() {
            switch(type) {
                case WebGLShaderType.VertexShader:
                    return gl.VERTEX_SHADER;
                case WebGLShaderType.FragmentShader:
                    return gl.FRAGMENT_SHADER;
            }
        })();

        let shader: WebGLShader | null = gl.createShader(glShaderType);

        if (shader === null) return null;

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
    
    var createProgram = function(gl: WebGLRenderingContext | WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
        let program: WebGLProgram | null = gl.createProgram();
        if (program == null) return null;

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