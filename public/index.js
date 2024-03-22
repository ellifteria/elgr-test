var PHONG_VERTEX_SHADER_SOURCE = document.getElementById("phongPhongVertexShader").textContent;
var PHONG_FRAGMENT_SHADER_SOURCE = document.getElementById("phongPhongFragmentShader").textContent;
var GOURAND_VERTEX_SHADER_SOURCE = document.getElementById("phongGourandVertexShader").textContent;
var GOURAND_FRAGMENT_SHADER_SOURCE = document.getElementById("phongGourandFragmentShader").textContent;
var B_GOURAND_VERTEX_SHADER_SOURCE = document.getElementById("blinnPhongGourandVertexShader").textContent;
var B_GOURAND_FRAGMENT_SHADER_SOURCE = document.getElementById("blinnPhongGourandFragmentShader").textContent;
var GROUND_VERTEX_SHADER_SOURCE = document.getElementById("groundVertexShader").textContent;
var GROUND_FRAGMENT_SHADER_SOURCE = document.getElementById("groundFragmentShader").textContent;
var SHIVERING_VERTEX_SHADER_SOURCE = document.getElementById("shiveringVertexShader").textContent;
var SHIVERING_FRAGMENT_SHADER_SOURCE = document.getElementById("shiveringFragmentShader").textContent;
if (typeof glMatrix === 'undefined') {
    var glMatrix = null;
}
var resizeCanvas;
var sP_phong;
var sP_ground;
var sP_gourand;
var sP_bGourand;
var sP_bPhong;
var sP_shivering;
function prepareShaderPrograms() {
    var positionAttributeData = {
        name: "a_position",
        size: 3,
        type: renderer_gl.FLOAT,
        isNormalized: false,
        stride: 7 * Float32Array.BYTES_PER_ELEMENT,
        offset: 0
    };
    var normalAttributeData = {
        name: "a_normal",
        size: 3,
        type: renderer_gl.FLOAT,
        isNormalized: false,
        stride: 7 * Float32Array.BYTES_PER_ELEMENT,
        offset: 4 * Float32Array.BYTES_PER_ELEMENT
    };
    var colorAttributeData = {
        name: "a_color",
        size: 3,
        type: renderer_gl.FLOAT,
        isNormalized: false,
        stride: 7 * Float32Array.BYTES_PER_ELEMENT,
        offset: 4 * Float32Array.BYTES_PER_ELEMENT
    };
    var _a = createWebGLProgram(PHONG_VERTEX_SHADER_SOURCE, PHONG_FRAGMENT_SHADER_SOURCE), _glSV_phong = _a[0], _glSF_phong = _a[1], glP_phong = _a[2];
    sP_phong = new ShaderProgram(glP_phong);
    var _b = createWebGLProgram(PHONG_VERTEX_SHADER_SOURCE, PHONG_FRAGMENT_SHADER_SOURCE), _glSV_bPhong = _b[0], _glSF_bPhong = _b[1], glP_bPhong = _b[2];
    sP_bPhong = new ShaderProgram(glP_bPhong);
    var _c = createWebGLProgram(GOURAND_VERTEX_SHADER_SOURCE, GOURAND_FRAGMENT_SHADER_SOURCE), _glSV_gourand = _c[0], _glSF_gourand = _c[1], glP_gourand = _c[2];
    sP_gourand = new ShaderProgram(glP_gourand);
    var _d = createWebGLProgram(B_GOURAND_VERTEX_SHADER_SOURCE, B_GOURAND_FRAGMENT_SHADER_SOURCE), _glSV_bGourand = _d[0], _glSF_bGourand = _d[1], glP_bGourand = _d[2];
    sP_bGourand = new ShaderProgram(glP_bGourand);
    var _e = createWebGLProgram(GROUND_VERTEX_SHADER_SOURCE, GROUND_FRAGMENT_SHADER_SOURCE), _glSV_ground = _e[0], _glSF_ground = _e[1], glP_ground = _e[2];
    sP_ground = new ShaderProgram(glP_ground);
    var _f = createWebGLProgram(SHIVERING_VERTEX_SHADER_SOURCE, SHIVERING_FRAGMENT_SHADER_SOURCE), _glSV_shivering = _f[0], _glSF_shivering = _f[1], glP_shivering = _f[2];
    sP_shivering = new ShaderProgram(glP_shivering);
    sP_phong.addUniform({ name: "u_modelViewMatrix" });
    sP_phong.addUniform({ name: "u_normalMatrix" });
    sP_phong.addUniform({ name: "u_projectionMatrix" });
    sP_phong.addUniform({ name: "u_eyePosition" });
    sP_phong.addUniform({ name: "u_Ka" });
    sP_phong.addUniform({ name: "u_Kd" });
    sP_phong.addUniform({ name: "u_Ks" });
    sP_phong.addUniform({ name: "u_shininessValue" });
    sP_phong.addUniform({ name: "u_ambientColor" });
    sP_phong.addUniform({ name: "u_diffuseColor" });
    sP_phong.addUniform({ name: "u_specularColor" });
    sP_phong.addUniform({ name: "u_lightPos" });
    sP_bPhong.addUniform({ name: "u_modelViewMatrix" });
    sP_bPhong.addUniform({ name: "u_normalMatrix" });
    sP_bPhong.addUniform({ name: "u_projectionMatrix" });
    sP_bPhong.addUniform({ name: "u_eyePosition" });
    sP_bPhong.addUniform({ name: "u_Ka" });
    sP_bPhong.addUniform({ name: "u_Kd" });
    sP_bPhong.addUniform({ name: "u_Ks" });
    sP_phong.addUniform({ name: "u_shininessValue" });
    sP_bPhong.addUniform({ name: "u_ambientColor" });
    sP_bPhong.addUniform({ name: "u_diffuseColor" });
    sP_bPhong.addUniform({ name: "u_specularColor" });
    sP_bPhong.addUniform({ name: "u_lightPos" });
    sP_gourand.addUniform({ name: "u_modelViewMatrix" });
    sP_gourand.addUniform({ name: "u_normalMatrix" });
    sP_gourand.addUniform({ name: "u_projectionMatrix" });
    sP_gourand.addUniform({ name: "u_eyePosition" });
    sP_gourand.addUniform({ name: "u_Ka" });
    sP_gourand.addUniform({ name: "u_Kd" });
    sP_gourand.addUniform({ name: "u_Ks" });
    sP_gourand.addUniform({ name: "u_shininessValue" });
    sP_gourand.addUniform({ name: "u_ambientColor" });
    sP_gourand.addUniform({ name: "u_diffuseColor" });
    sP_gourand.addUniform({ name: "u_specularColor" });
    sP_gourand.addUniform({ name: "u_lightPos" });
    sP_bGourand.addUniform({ name: "u_modelViewMatrix" });
    sP_bGourand.addUniform({ name: "u_normalMatrix" });
    sP_bGourand.addUniform({ name: "u_projectionMatrix" });
    sP_bGourand.addUniform({ name: "u_eyePosition" });
    sP_bGourand.addUniform({ name: "u_Ka" });
    sP_bGourand.addUniform({ name: "u_Kd" });
    sP_bGourand.addUniform({ name: "u_Ks" });
    sP_bGourand.addUniform({ name: "u_shininessValue" });
    sP_bGourand.addUniform({ name: "u_ambientColor" });
    sP_bGourand.addUniform({ name: "u_diffuseColor" });
    sP_bGourand.addUniform({ name: "u_specularColor" });
    sP_bGourand.addUniform({ name: "u_lightPos" });
    sP_ground.addUniform({ name: "u_modelViewMatrix" });
    sP_ground.addUniform({ name: "u_projectionMatrix" });
    sP_shivering.addUniform({ name: "u_modelViewMatrix" });
    sP_shivering.addUniform({ name: "u_projectionMatrix" });
    sP_shivering.addUniform({ name: "u_A" });
    sP_shivering.addUniform({ name: "u_B" });
    sP_shivering.addUniform({ name: "u_C" });
    sP_shivering.addUniform({ name: "u_time" });
    sP_phong.addAttribute(positionAttributeData);
    sP_phong.addAttribute(normalAttributeData);
    sP_bPhong.addAttribute(positionAttributeData);
    sP_bPhong.addAttribute(normalAttributeData);
    sP_gourand.addAttribute(positionAttributeData);
    sP_gourand.addAttribute(normalAttributeData);
    sP_bGourand.addAttribute(positionAttributeData);
    sP_bGourand.addAttribute(normalAttributeData);
    sP_ground.addAttribute(positionAttributeData);
    sP_ground.addAttribute(colorAttributeData);
    sP_shivering.addAttribute(positionAttributeData);
    sP_shivering.addAttribute(colorAttributeData);
}
function makeSphereSnake(material) {
    var sphereSnakeGroupBase = new GroupNode("sphereSnakeBase", []);
    var drawSphere = new DrawNode("drawSnakeSphere", function (worldMatrix, _parameters) {
        var myMatrix = glMatrix.mat4.clone(worldMatrix);
        var myNormalMatrix = glMatrix.mat4.create();
        glMatrix.mat4.invert(myNormalMatrix, myMatrix);
        glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
        material.setMaterialInShader(sP_active);
        sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
        objectsVBO.draw("icosphere");
    });
    var group1 = new GroupNode("sphereSnakeGroup1", []);
    var group2 = new GroupNode("sphereSnakeGroup2", []);
    var group3 = new GroupNode("sphereSnakeGroup3", []);
    var group4 = new GroupNode("sphereSnakeGroup4", []);
    var connector1 = new TransformationNode("sphereSnakeTransform1", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(1, 0, 0));
    }, null);
    var connector2 = new TransformationNode("sphereSnakeTransform2", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2"), glMatrix.vec3.fromValues(0, 1, 0));
    }, null);
    var connector3 = new TransformationNode("sphereSnakeTransform3", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(0, 0, 1));
    }, null);
    var connector4 = new TransformationNode("sphereSnakeTransform4", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2"), glMatrix.vec3.fromValues(0, 1, 0));
    }, null);
    var connector5 = new TransformationNode("sphereSnakeTransform5", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(1, 0, 0));
    }, null);
    connector5.child = drawSphere;
    connector4.child = group4;
    connector3.child = group3;
    connector2.child = group2;
    connector1.child = group1;
    group4.children.push(connector5);
    group4.children.push(drawSphere);
    group3.children.push(connector4);
    group3.children.push(drawSphere);
    group2.children.push(connector3);
    group2.children.push(drawSphere);
    group1.children.push(connector2);
    group1.children.push(drawSphere);
    sphereSnakeGroupBase.children.push(drawSphere);
    sphereSnakeGroupBase.children.push(connector1);
    return sphereSnakeGroupBase;
}
function makeCubeSnake(material) {
    var cubeSnakeGroupBase = new GroupNode("cubeSnakeBase", []);
    var drawCube = new DrawNode("drawSnakeCube", function (worldMatrix, _parameters) {
        var myMatrix = glMatrix.mat4.clone(worldMatrix);
        var myNormalMatrix = glMatrix.mat4.create();
        glMatrix.mat4.invert(myNormalMatrix, myMatrix);
        glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
        material.setMaterialInShader(sP_active);
        sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
        objectsVBO.draw("cube");
    });
    var group1 = new GroupNode("cubeSnakeGroup1", []);
    var group2 = new GroupNode("cubeSnakeGroup2", []);
    var group3 = new GroupNode("cubeSnakeGroup3", []);
    var group4 = new GroupNode("cubeSnakeGroup4", []);
    var connector1 = new TransformationNode("cubeSnakeTransform1", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(1, 0, 0));
    }, null);
    var connector2 = new TransformationNode("cubeSnakeTransform2", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2"), glMatrix.vec3.fromValues(0, 1, 0));
    }, null);
    var connector3 = new TransformationNode("cubeSnakeTransform3", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(0, 0, 1));
    }, null);
    var connector4 = new TransformationNode("cubeSnakeTransform4", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2"), glMatrix.vec3.fromValues(0, 1, 0));
    }, null);
    var connector5 = new TransformationNode("cubeSnakeTransform5", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(1, 0, 0));
    }, null);
    connector5.child = drawCube;
    connector4.child = group4;
    connector3.child = group3;
    connector2.child = group2;
    connector1.child = group1;
    group4.children.push(connector5);
    group4.children.push(drawCube);
    group3.children.push(connector4);
    group3.children.push(drawCube);
    group2.children.push(connector3);
    group2.children.push(drawCube);
    group1.children.push(connector2);
    group1.children.push(drawCube);
    cubeSnakeGroupBase.children.push(drawCube);
    cubeSnakeGroupBase.children.push(connector1);
    return cubeSnakeGroupBase;
}
function makeCubeSphereSnake(material1, material2) {
    var cubeSphereSnakeGroupBase = new GroupNode("cubeSphereSnakeBase", []);
    var drawCube = new DrawNode("drawSnakeSphereCube", function (worldMatrix, _parameters) {
        var myMatrix = glMatrix.mat4.clone(worldMatrix);
        var myNormalMatrix = glMatrix.mat4.create();
        glMatrix.mat4.invert(myNormalMatrix, myMatrix);
        glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
        material1.setMaterialInShader(sP_active);
        sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
        objectsVBO.draw("cube");
    });
    var drawSphere = new DrawNode("drawSnakeCubeSphere", function (worldMatrix, _parameters) {
        var myMatrix = glMatrix.mat4.clone(worldMatrix);
        var myNormalMatrix = glMatrix.mat4.create();
        glMatrix.mat4.invert(myNormalMatrix, myMatrix);
        glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
        material2.setMaterialInShader(sP_active);
        sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
        objectsVBO.draw("icosphere");
    });
    var group1 = new GroupNode("cubeSphereSnakeGroup1", []);
    var group2 = new GroupNode("cubeSphereSnakeGroup2", []);
    var group3 = new GroupNode("cubeSphereSnakeGroup3", []);
    var group4 = new GroupNode("cubeSphereSnakeGroup4", []);
    var connector1 = new TransformationNode("cubeSphereSnakeTransform1", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2"), glMatrix.vec3.fromValues(1, 0, 0));
    }, null);
    var connector2 = new TransformationNode("cubeSphereSnakeTransform2", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(0, 1, 0));
    }, null);
    var connector3 = new TransformationNode("cubeSphereSnakeTransform3", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2") * animator.getValue("snake1"), glMatrix.vec3.fromValues(0, 0, 1));
    }, null);
    var connector4 = new TransformationNode("cubeSphereSnakeTransform4", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(0, 1, 0));
    }, null);
    var connector5 = new TransformationNode("cubeSphereSnakeTransform5", function (childWorldMatrix, worldMatrix, parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2") - animator.getValue("snake1"), glMatrix.vec3.fromValues(1, 0, 0));
    }, null);
    connector5.child = drawCube;
    connector4.child = group4;
    connector3.child = group3;
    connector2.child = group2;
    connector1.child = group1;
    group4.children.push(connector5);
    group4.children.push(drawSphere);
    group3.children.push(connector4);
    group3.children.push(drawCube);
    group2.children.push(connector3);
    group2.children.push(drawSphere);
    group1.children.push(connector2);
    group1.children.push(drawCube);
    cubeSphereSnakeGroupBase.children.push(drawCube);
    cubeSphereSnakeGroupBase.children.push(connector1);
    return cubeSphereSnakeGroupBase;
}
var viewMatrix, perspectiveMatrix, viewWorldMatrix, perspectiveViewMatrix, normalMatrix;
var keyListener;
var sP_active;
var animator;
var objectsVBO;
function main() {
    var canvas = initWebGL();
    resizeCanvas = function () {
        var extraMargin = 16;
        canvas.width = window.innerWidth - extraMargin;
        canvas.height = (window.innerHeight * 0.7) - extraMargin;
    };
    resizeCanvas();
    prepareShaderPrograms();
    renderer_gl.clear(renderer_gl.COLOR_BUFFER_BIT | renderer_gl.DEPTH_BUFFER_BIT);
    objectsVBO = new VertexBufferObject(7);
    objectsVBO.addVertices("cube", createRectangularPrism(1, 1, 1).toFloat32Array(), renderer_gl.TRIANGLES);
    var myIcosphere = createIcosphere(4);
    objectsVBO.addVertices("icosphere", myIcosphere.toFloat32Array(), renderer_gl.TRIANGLES);
    var groundVBO = new VertexBufferObject(7);
    groundVBO.addVertices("ground", (new GroundPlane()).makeGroundGrid(), renderer_gl.LINES);
    sP_phong.activate();
    sP_phong.loadBufferData(objectsVBO.vertices);
    sP_bPhong.activate();
    sP_bPhong.loadBufferData(objectsVBO.vertices);
    sP_gourand.activate();
    sP_gourand.loadBufferData(objectsVBO.vertices);
    sP_bGourand.activate();
    sP_bGourand.loadBufferData(objectsVBO.vertices);
    sP_ground.activate();
    sP_ground.loadBufferData(groundVBO.vertices);
    sP_shivering.activate();
    sP_shivering.loadBufferData(objectsVBO.vertices);
    sP_phong.activate();
    var cubeRotation = {
        value: 0,
        rate: 1,
        variables: { maximum: 2 * Math.PI },
        update: function (_currentTime, scaledTimeDelta, animationState) {
            var value = animationState.value;
            value += animationState.rate * scaledTimeDelta;
            if (value > animationState.variables.maximum) {
                value = 0;
            }
            return { value: value, rate: animationState.rate, variables: animationState.variables, update: animationState.update };
        }
    };
    renderer_gl.clearColor(0 / 255, 101 / 255, 179 / 255, 1.0);
    renderer_gl.depthFunc(renderer_gl.LESS);
    renderer_gl.clearDepth(1.0);
    renderer_gl.enable(renderer_gl.DEPTH_TEST);
    animator = new Animator();
    animator.addAnimation("cube", cubeRotation);
    var cubeDrawFunction = function (worldMatrix, _parameters) {
        var myMatrix = glMatrix.mat4.clone(worldMatrix);
        var myNormalMatrix = glMatrix.mat4.clone(_parameters.normalMatrix);
        glMatrix.mat4.invert(myNormalMatrix, myMatrix);
        glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
        cubeWorm1Material.setMaterialInShader(sP_active);
        sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
        objectsVBO.draw("cube");
    };
    var shiveringCubeDrawFunction = function (worldMatrix, _parameters) {
        var myMatrix = glMatrix.mat4.clone(worldMatrix);
        sP_shivering.activate();
        sphereCubeWorm1Material2.setMaterialInShader(sP_shivering);
        sP_shivering.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_shivering.setUniform1F("u_A", 10.0);
        sP_shivering.setUniform1F("u_B", 10.0);
        sP_shivering.setUniform1F("u_C", 5.0);
        sP_shivering.setUniform1F("u_time", Date.now());
        objectsVBO.draw("cube");
        sP_active.activate();
    };
    var sceneGraphBase = new BaseNode("base", viewWorldMatrix, null);
    var sceneGraph = new GroupNode("baseGroup", []);
    var rotationNode = new TransformationNode("rotation", function (childWorldMatrix, worldMatrix, _parameters) {
        glMatrix.mat4.rotate(childWorldMatrix, worldMatrix, animator.getValue("cube"), glMatrix.vec3.fromValues(0, 1, 0));
    }, null);
    var translationNode1 = new TransformationNode("translation1", function (childWorldMatrix, worldMatrix, _parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 4, 0));
    }, null);
    var translationNode2 = new TransformationNode("translation2", function (childWorldMatrix, worldMatrix, _parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(3, 0, 0));
    }, null);
    var cubeDrawNode = new DrawNode("drawCube", cubeDrawFunction);
    var shiveringCubeDrawNode = new DrawNode("drawShiveringCube", shiveringCubeDrawFunction);
    rotationNode.child = cubeDrawNode;
    var groupNode1 = new GroupNode("groupNode1", [rotationNode, translationNode2]);
    translationNode1.child = groupNode1;
    translationNode2.child = shiveringCubeDrawNode;
    sceneGraph.children.push(translationNode1);
    sceneGraphBase.child = sceneGraph;
    var groundDrawNode = new DrawNode("ground", function (worldMatrix, _parameters) {
        var myMatrix = glMatrix.mat4.clone(worldMatrix);
        sP_ground.activate();
        sP_ground.setUniformMatrix4FV("u_projectionMatrix", perspectiveMatrix);
        sP_ground.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        groundVBO.draw("ground");
        sP_active.activate();
    });
    sceneGraph.children.push(groundDrawNode);
    // , 32.95444151833879, -31.446755444213434, 8.616349051635954
    var camera = new MovableCamera(35, -30, 9, 1, 150, -10, 0.75, 1);
    keyListener = new KeyStates();
    keyListener.initKeyStates([
        { name: "KeyI", ifDown: function () { camera.updateFacing(0, 1); } },
        { name: "KeyJ", ifDown: function () { camera.updateFacing(1, 0); } },
        { name: "KeyK", ifDown: function () { camera.updateFacing(0, -1); } },
        { name: "KeyL", ifDown: function () { camera.updateFacing(-1, 0); } }
    ]);
    window.addEventListener("keydown", function (ev) { return KeyStates.onKeydown(ev, keyListener); }, false);
    window.addEventListener("keyup", function (ev) { return KeyStates.onKeyup(ev, keyListener); }, false);
    console.log(keyListener.keyStateMap);
    var translationNode3 = new TransformationNode("translation3", function (childWorldMatrix, worldMatrix, _parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(-7, -7, 0));
    }, null);
    var icosphereDrawFunction = function (worldMatrix, _parameters) {
        var myMatrix = glMatrix.mat4.clone(worldMatrix);
        var myNormalMatrix = glMatrix.mat4.clone(_parameters.normalMatrix);
        glMatrix.mat4.scale(myMatrix, myMatrix, glMatrix.vec3.fromValues(3, 3, 3));
        glMatrix.mat4.rotate(myMatrix, myMatrix, animator.getValue("sphere"), glMatrix.vec3.fromValues(0, 0, 1));
        glMatrix.mat4.invert(myNormalMatrix, myMatrix);
        glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
        bigSphereMaterial.setMaterialInShader(sP_active);
        sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
        objectsVBO.draw("icosphere");
    };
    var icosphereDrawNode = new DrawNode("drawIcosphere", icosphereDrawFunction);
    var icosphereWormDrawFunction = function (worldMatrix, _parameters) {
        var myMatrix = glMatrix.mat4.clone(worldMatrix);
        var myNormalMatrix = glMatrix.mat4.clone(_parameters.normalMatrix);
        glMatrix.mat4.scale(myMatrix, myMatrix, glMatrix.vec3.fromValues(0.3, 0.3, 0.3));
        glMatrix.mat4.invert(myNormalMatrix, myMatrix);
        glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
        sphereWorm1Material.setMaterialInShader(sP_active);
        sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
        objectsVBO.draw("icosphere");
    };
    var icosphereWormDrawNode = new DrawNode("drawIcosphereWorm", icosphereWormDrawFunction);
    translationNode3.child = icosphereDrawNode;
    sceneGraph.children.push(translationNode3);
    sceneGraph.children.push(icosphereWormDrawNode);
    var bigSphereMaterial = new Material("341900", "cc6600", "ffffff", 1.0, 1.0, 1.0, 80);
    var cubeWorm1Material = new Material("000433", "0077cc", "ffffff", 1.0, 0.75, 0.5, 6);
    var sphereWorm1Material = new Material("330012", "cc0044", "ffffff", 0.5, 1.0, 0.33, 40);
    var sphereCubeWorm1Material1 = new Material("003303", "03cc00", "ffffff", 0.2, 0.5, 0.7, 128);
    var sphereCubeWorm1Material2 = new Material("333300", "ccc200", "ffffff", 0.2, 0.85, 0.7, 128);
    sceneGraph.children.push(new TransformationNode("cubeSnakeLocation", function (childWorldMatrix, worldMatrix, _parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(2, -13, 0));
        glMatrix.mat4.scale(childWorldMatrix, childWorldMatrix, glMatrix.vec3.fromValues(0.5, 0.5, 0.5));
    }, makeCubeSnake(cubeWorm1Material)));
    sceneGraph.children.push(new TransformationNode("sphereSnakeLocation", function (childWorldMatrix, worldMatrix, _parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(-13, 2, 0));
        glMatrix.mat4.scale(childWorldMatrix, childWorldMatrix, glMatrix.vec3.fromValues(0.5, 0.5, 0.5));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, Math.PI * 2 / 3, glMatrix.vec3.fromValues(1, 1, 0));
    }, makeSphereSnake(sphereWorm1Material)));
    sceneGraph.children.push(new TransformationNode("cubeSphereSnakeLocation", function (childWorldMatrix, worldMatrix, _parameters) {
        glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(-10, -10, 0));
        glMatrix.mat4.scale(childWorldMatrix, childWorldMatrix, glMatrix.vec3.fromValues(0.5, 0.5, 0.5));
        glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, Math.PI * 2 / 3, glMatrix.vec3.fromValues(0, 1, 0));
    }, makeCubeSphereSnake(sphereCubeWorm1Material1, sphereCubeWorm1Material2)));
    var snakeAnimation1 = {
        value: 0,
        rate: 1,
        variables: { maximum: 2 * Math.PI },
        update: function (_currentTime, scaledTimeDelta, animationState) {
            var value = animationState.value;
            value += animationState.rate * scaledTimeDelta;
            if (value > animationState.variables.maximum) {
                value = 0;
            }
            return { value: value, rate: animationState.rate, variables: animationState.variables, update: animationState.update };
        }
    };
    var snakeAnimation2 = {
        value: Math.PI / 4,
        rate: 0.5,
        variables: { maximum: 2 * Math.PI },
        update: function (_currentTime, scaledTimeDelta, animationState) {
            var value = animationState.value;
            value += animationState.rate * scaledTimeDelta;
            if (value > animationState.variables.maximum) {
                value = 0;
            }
            return { value: value, rate: animationState.rate, variables: animationState.variables, update: animationState.update };
        }
    };
    animator.addAnimation("snake1", snakeAnimation1);
    animator.addAnimation("snake2", snakeAnimation2);
    sP_phong.setUniform3FV("u_lightPos", glMatrix.vec3.fromValues(30, 30, 0));
    sP_bPhong.activate();
    sP_bPhong.setUniform3FV("u_lightPos", glMatrix.vec3.fromValues(30, 30, 0));
    sP_gourand.activate();
    sP_gourand.setUniform3FV("u_lightPos", glMatrix.vec3.fromValues(30, 30, 0));
    sP_bGourand.activate();
    sP_bGourand.setUniform3FV("u_lightPos", glMatrix.vec3.fromValues(30, 30, 0));
    sP_active = sP_phong;
    sP_active.activate();
    var sphereRotation = {
        value: 0,
        rate: 1,
        variables: { maximum: 2 * Math.PI },
        update: function (_currentTime, scaledTimeDelta, animationState) {
            var value = animationState.value;
            value += animationState.rate * scaledTimeDelta;
            if (value > animationState.variables.maximum) {
                value = 0;
            }
            return { value: value, rate: animationState.rate, variables: animationState.variables, update: animationState.update };
        }
    };
    animator.addAnimation("sphere", sphereRotation);
    sceneGraphBase.printGraph();
    var tick = function () {
        console.log("".concat(camera.eyeX, ", ").concat(camera.eyeY, ", ").concat(camera.eyeZ, ", ").concat(camera.lookAtX, ", ").concat(camera.lookAtY, ", ").concat(camera.lookAtZ));
        KeyStates.callFunctions(keyListener);
        renderer_gl.viewport(0, 0, canvas.width, canvas.height);
        renderer_gl.clear(renderer_gl.COLOR_BUFFER_BIT | renderer_gl.DEPTH_BUFFER_BIT);
        animator.animate();
        perspectiveMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(perspectiveMatrix, glMatrix.glMatrix.toRadian(35), canvas.width / canvas.height, 0.5, 5000.0);
        viewMatrix = glMatrix.mat4.create();
        glMatrix.mat4.lookAt(viewMatrix, glMatrix.vec3.fromValues(camera.eyeX, camera.eyeY, camera.eyeZ), glMatrix.vec3.fromValues(camera.lookAtX, camera.lookAtY, camera.lookAtZ), glMatrix.vec3.fromValues(0, 0, 1));
        sP_active.setUniformMatrix4FV("u_projectionMatrix", perspectiveMatrix);
        sP_active.setUniform3FV("u_eyePosition", [camera.eyeX, camera.eyeY, camera.eyeZ]);
        viewWorldMatrix = glMatrix.mat4.clone(viewMatrix);
        sceneGraphBase.baseWorldMatrix = viewWorldMatrix;
        normalMatrix = glMatrix.mat4.create();
        glMatrix.mat4.invert(normalMatrix, viewWorldMatrix);
        glMatrix.mat4.transpose(normalMatrix, normalMatrix);
        sceneGraphBase.traverseGraph({ perspectiveMatrix: perspectiveMatrix, normalMatrix: normalMatrix });
        requestAnimationFrame(tick);
    };
    tick();
}
function changeShader() {
    var newShaderName = document.getElementById("selectShader").value;
    switch (newShaderName) {
        case "phong":
            sP_active = sP_phong;
            break;
        case "gourand":
            sP_active = sP_gourand;
            break;
    }
    sP_active.activate();
}