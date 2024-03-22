const PHONG_VERTEX_SHADER_SOURCE = document.getElementById("phongPhongVertexShader")!.textContent!;
const PHONG_FRAGMENT_SHADER_SOURCE = document.getElementById("phongPhongFragmentShader")!.textContent!;

const GOURAND_VERTEX_SHADER_SOURCE = document.getElementById("phongGourandVertexShader")!.textContent!;
const GOURAND_FRAGMENT_SHADER_SOURCE = document.getElementById("phongGourandFragmentShader")!.textContent!;

const B_GOURAND_VERTEX_SHADER_SOURCE = document.getElementById("blinnPhongGourandVertexShader")!.textContent!;
const B_GOURAND_FRAGMENT_SHADER_SOURCE = document.getElementById("blinnPhongGourandFragmentShader")!.textContent!;

const GROUND_VERTEX_SHADER_SOURCE = document.getElementById("groundVertexShader")!.textContent!;
const GROUND_FRAGMENT_SHADER_SOURCE = document.getElementById("groundFragmentShader")!.textContent!;

const SHIVERING_VERTEX_SHADER_SOURCE = document.getElementById("shiveringVertexShader")!.textContent!;
const SHIVERING_FRAGMENT_SHADER_SOURCE = document.getElementById("shiveringFragmentShader")!.textContent!;

if (typeof glMatrix === 'undefined') {
    var glMatrix = null
}

let resizeCanvas: () => void;

let sP_phong: ShaderProgram;
let sP_ground: ShaderProgram;
let sP_gourand: ShaderProgram;
let sP_bGourand: ShaderProgram;
let sP_bPhong: ShaderProgram;
let sP_shivering: ShaderProgram;
function prepareShaderPrograms() {

    let positionAttributeData: AttributeData = {
        name: "a_position",
        size: 3,
        type: renderer_gl.FLOAT,
        isNormalized: false,
        stride: 7 * Float32Array.BYTES_PER_ELEMENT,
        offset: 0
    };

    let normalAttributeData: AttributeData = {
        name: "a_normal",
        size: 3,
        type: renderer_gl.FLOAT,
        isNormalized: false,
        stride: 7 * Float32Array.BYTES_PER_ELEMENT,
        offset: 4 * Float32Array.BYTES_PER_ELEMENT
    };

    let colorAttributeData: AttributeData = {
        name: "a_color",
        size: 3,
        type: renderer_gl.FLOAT,
        isNormalized: false,
        stride: 7 * Float32Array.BYTES_PER_ELEMENT,
        offset: 4 * Float32Array.BYTES_PER_ELEMENT
    };

    let [_glSV_phong, _glSF_phong, glP_phong] = createWebGLProgram(PHONG_VERTEX_SHADER_SOURCE, PHONG_FRAGMENT_SHADER_SOURCE);
    sP_phong = new ShaderProgram(glP_phong);

    let [_glSV_bPhong, _glSF_bPhong, glP_bPhong] = createWebGLProgram(PHONG_VERTEX_SHADER_SOURCE, PHONG_FRAGMENT_SHADER_SOURCE);
    sP_bPhong = new ShaderProgram(glP_bPhong);

    let [_glSV_gourand, _glSF_gourand, glP_gourand] = createWebGLProgram(GOURAND_VERTEX_SHADER_SOURCE, GOURAND_FRAGMENT_SHADER_SOURCE);
    sP_gourand = new ShaderProgram(glP_gourand);

    let [_glSV_bGourand, _glSF_bGourand, glP_bGourand] = createWebGLProgram(B_GOURAND_VERTEX_SHADER_SOURCE, B_GOURAND_FRAGMENT_SHADER_SOURCE);
    sP_bGourand = new ShaderProgram(glP_bGourand);

    let [_glSV_ground, _glSF_ground, glP_ground] = createWebGLProgram(GROUND_VERTEX_SHADER_SOURCE, GROUND_FRAGMENT_SHADER_SOURCE);
    sP_ground = new ShaderProgram(glP_ground);

    let [_glSV_shivering, _glSF_shivering, glP_shivering] = createWebGLProgram(SHIVERING_VERTEX_SHADER_SOURCE, SHIVERING_FRAGMENT_SHADER_SOURCE);
    sP_shivering = new ShaderProgram(glP_shivering);

    sP_phong.addUniform({name: "u_modelViewMatrix"});
    sP_phong.addUniform({name: "u_normalMatrix"});
    sP_phong.addUniform({name: "u_projectionMatrix"});
    sP_phong.addUniform({name: "u_eyePosition"});
    sP_phong.addUniform({name: "u_Ka"});
    sP_phong.addUniform({name: "u_Kd"});
    sP_phong.addUniform({name: "u_Ks"});
    sP_phong.addUniform({name: "u_shininessValue"});
    sP_phong.addUniform({name: "u_ambientColor"});
    sP_phong.addUniform({name: "u_diffuseColor"});
    sP_phong.addUniform({name: "u_specularColor"});
    sP_phong.addUniform({name: "u_lightPos"});

    sP_bPhong.addUniform({name: "u_modelViewMatrix"});
    sP_bPhong.addUniform({name: "u_normalMatrix"});
    sP_bPhong.addUniform({name: "u_projectionMatrix"});
    sP_bPhong.addUniform({name: "u_eyePosition"});
    sP_bPhong.addUniform({name: "u_Ka"});
    sP_bPhong.addUniform({name: "u_Kd"});
    sP_bPhong.addUniform({name: "u_Ks"});
    sP_phong.addUniform({name: "u_shininessValue"});
    sP_bPhong.addUniform({name: "u_ambientColor"});
    sP_bPhong.addUniform({name: "u_diffuseColor"});
    sP_bPhong.addUniform({name: "u_specularColor"});
    sP_bPhong.addUniform({name: "u_lightPos"});

    sP_gourand.addUniform({name: "u_modelViewMatrix"});
    sP_gourand.addUniform({name: "u_normalMatrix"});
    sP_gourand.addUniform({name: "u_projectionMatrix"});
    sP_gourand.addUniform({name: "u_eyePosition"});
    sP_gourand.addUniform({name: "u_Ka"});
    sP_gourand.addUniform({name: "u_Kd"});
    sP_gourand.addUniform({name: "u_Ks"});
    sP_gourand.addUniform({name: "u_shininessValue"});
    sP_gourand.addUniform({name: "u_ambientColor"});
    sP_gourand.addUniform({name: "u_diffuseColor"});
    sP_gourand.addUniform({name: "u_specularColor"});
    sP_gourand.addUniform({name: "u_lightPos"});

    sP_bGourand.addUniform({name: "u_modelViewMatrix"});
    sP_bGourand.addUniform({name: "u_normalMatrix"});
    sP_bGourand.addUniform({name: "u_projectionMatrix"});
    sP_bGourand.addUniform({name: "u_eyePosition"});
    sP_bGourand.addUniform({name: "u_Ka"});
    sP_bGourand.addUniform({name: "u_Kd"});
    sP_bGourand.addUniform({name: "u_Ks"});
    sP_bGourand.addUniform({name: "u_shininessValue"});
    sP_bGourand.addUniform({name: "u_ambientColor"});
    sP_bGourand.addUniform({name: "u_diffuseColor"});
    sP_bGourand.addUniform({name: "u_specularColor"});
    sP_bGourand.addUniform({name: "u_lightPos"});
    
    sP_ground.addUniform({name: "u_modelViewMatrix"});
    sP_ground.addUniform({name: "u_projectionMatrix"});

    sP_shivering.addUniform({name: "u_modelViewMatrix"});
    sP_shivering.addUniform({name: "u_projectionMatrix"});
    sP_shivering.addUniform({name: "u_A"});
    sP_shivering.addUniform({name: "u_B"});
    sP_shivering.addUniform({name: "u_C"});
    sP_shivering.addUniform({name: "u_time"});

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

function makeSphereSnake(material): SceneGraphNode {
    let sphereSnakeGroupBase = new GroupNode("sphereSnakeBase", []);

    let drawSphere = new DrawNode(
        "drawSnakeSphere",
        function(worldMatrix, _parameters) {
            let myMatrix = glMatrix.mat4.clone(worldMatrix);
            let myNormalMatrix = glMatrix.mat4.create();
    
            glMatrix.mat4.invert(myNormalMatrix, myMatrix);
            glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
    
            material.setMaterialInShader(sP_active);
    
            sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
            sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
            objectsVBO.draw("icosphere");
        }
    );
    
    let group1 = new GroupNode("sphereSnakeGroup1", []);
    let group2 = new GroupNode("sphereSnakeGroup2", []);
    let group3 = new GroupNode("sphereSnakeGroup3", []);
    let group4 = new GroupNode("sphereSnakeGroup4", []);

    let connector1 = new TransformationNode(
        "sphereSnakeTransform1",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(1, 0, 0));
        },
        null
    );

    let connector2 = new TransformationNode(
        "sphereSnakeTransform2",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2"), glMatrix.vec3.fromValues(0, 1, 0));
        },
        null
    );

    let connector3 = new TransformationNode(
        "sphereSnakeTransform3",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(0, 0, 1));
        },
        null
    );

    let connector4 = new TransformationNode(
        "sphereSnakeTransform4",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2"), glMatrix.vec3.fromValues(0, 1, 0));
        },
        null
    );

    let connector5 = new TransformationNode(
        "sphereSnakeTransform5",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(1, 0, 0));
        },
        null
    );

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


function makeCubeSnake(material): SceneGraphNode {
    let cubeSnakeGroupBase = new GroupNode("cubeSnakeBase", []);

    let drawCube = new DrawNode(
        "drawSnakeCube",
        function(worldMatrix, _parameters) {
            let myMatrix = glMatrix.mat4.clone(worldMatrix);
            let myNormalMatrix = glMatrix.mat4.create();
    
            glMatrix.mat4.invert(myNormalMatrix, myMatrix);
            glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
    
            material.setMaterialInShader(sP_active);
    
            sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
            sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
            objectsVBO.draw("cube");
        }
    );
    
    let group1 = new GroupNode("cubeSnakeGroup1", []);
    let group2 = new GroupNode("cubeSnakeGroup2", []);
    let group3 = new GroupNode("cubeSnakeGroup3", []);
    let group4 = new GroupNode("cubeSnakeGroup4", []);

    let connector1 = new TransformationNode(
        "cubeSnakeTransform1",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(1, 0, 0));
        },
        null
    );

    let connector2 = new TransformationNode(
        "cubeSnakeTransform2",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2"), glMatrix.vec3.fromValues(0, 1, 0));
        },
        null
    );

    let connector3 = new TransformationNode(
        "cubeSnakeTransform3",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(0, 0, 1));
        },
        null
    );

    let connector4 = new TransformationNode(
        "cubeSnakeTransform4",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2"), glMatrix.vec3.fromValues(0, 1, 0));
        },
        null
    );

    let connector5 = new TransformationNode(
        "cubeSnakeTransform5",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(1, 0, 0));
        },
        null
    );

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

function makeCubeSphereSnake(material1, material2): SceneGraphNode {
    let cubeSphereSnakeGroupBase = new GroupNode("cubeSphereSnakeBase", []);

    let drawCube = new DrawNode(
        "drawSnakeSphereCube",
        function(worldMatrix, _parameters) {
            let myMatrix = glMatrix.mat4.clone(worldMatrix);
            let myNormalMatrix = glMatrix.mat4.create();
    
            glMatrix.mat4.invert(myNormalMatrix, myMatrix);
            glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
    
            material1.setMaterialInShader(sP_active);
    
            sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
            sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
            objectsVBO.draw("cube");
        }
    );

    let drawSphere = new DrawNode(
        "drawSnakeCubeSphere",
        function(worldMatrix, _parameters) {
            let myMatrix = glMatrix.mat4.clone(worldMatrix);
            let myNormalMatrix = glMatrix.mat4.create();
    
            glMatrix.mat4.invert(myNormalMatrix, myMatrix);
            glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);
    
            material2.setMaterialInShader(sP_active);
    
            sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
            sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
            objectsVBO.draw("icosphere");
        }
    );
    
    let group1 = new GroupNode("cubeSphereSnakeGroup1", []);
    let group2 = new GroupNode("cubeSphereSnakeGroup2", []);
    let group3 = new GroupNode("cubeSphereSnakeGroup3", []);
    let group4 = new GroupNode("cubeSphereSnakeGroup4", []);

    let connector1 = new TransformationNode(
        "cubeSphereSnakeTransform1",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2"), glMatrix.vec3.fromValues(1, 0, 0));
        },
        null
    );

    let connector2 = new TransformationNode(
        "cubeSphereSnakeTransform2",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(0, 1, 0));
        },
        null
    );

    let connector3 = new TransformationNode(
        "cubeSphereSnakeTransform3",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2") * animator.getValue("snake1"), glMatrix.vec3.fromValues(0, 0, 1));
        },
        null
    );

    let connector4 = new TransformationNode(
        "cubeSphereSnakeTransform4",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake1"), glMatrix.vec3.fromValues(0, 1, 0));
        },
        null
    );

    let connector5 = new TransformationNode(
        "cubeSphereSnakeTransform5",
        function(childWorldMatrix, worldMatrix, parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 1, 0));
            glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, animator.getValue("snake2") - animator.getValue("snake1"), glMatrix.vec3.fromValues(1, 0, 0));
        },
        null
    );

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

let viewMatrix, perspectiveMatrix, viewWorldMatrix, perspectiveViewMatrix, normalMatrix;
let keyListener: KeyStates;
let sP_active: ShaderProgram;
let animator: Animator;
let objectsVBO;
function main() {
    let canvas = initWebGL();

    resizeCanvas = function() {
        let extraMargin = 16;
        canvas.width = window.innerWidth - extraMargin;
        canvas.height = (window.innerHeight*0.7) - extraMargin;
    }

    resizeCanvas();

    prepareShaderPrograms();
    
    renderer_gl.clear(renderer_gl.COLOR_BUFFER_BIT | renderer_gl.DEPTH_BUFFER_BIT);
    
    objectsVBO = new VertexBufferObject(7);
    objectsVBO.addVertices("cube", createRectangularPrism(1, 1, 1).toFloat32Array(), renderer_gl.TRIANGLES);

    let myIcosphere = createIcosphere(4);
    objectsVBO.addVertices("icosphere", myIcosphere.toFloat32Array(), renderer_gl.TRIANGLES);

    let groundVBO = new VertexBufferObject(7);

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
    
    let cubeRotation: AnimationState = {
        value: 0,
        rate: 1,
        variables: {maximum: 2 * Math.PI},
        update: function(_currentTime: number, scaledTimeDelta: number, animationState: AnimationState): AnimationState
        {
            let value = animationState.value;
            value += animationState.rate * scaledTimeDelta;
            
            if (value > animationState.variables.maximum) {
                value = 0;
            }
            
            return {value: value, rate: animationState.rate, variables: animationState.variables, update: animationState.update};
        }
    }
    
    renderer_gl.clearColor(0/255, 101/255, 179/255, 1.0);
    
    renderer_gl.depthFunc(renderer_gl.LESS);
    renderer_gl.clearDepth(1.0);
    renderer_gl.enable(renderer_gl.DEPTH_TEST); 	
    
    animator = new Animator();
    animator.addAnimation("cube", cubeRotation);

    let cubeDrawFunction = function(worldMatrix, _parameters) {
        let myMatrix = glMatrix.mat4.clone(worldMatrix);
        let myNormalMatrix = glMatrix.mat4.clone(_parameters.normalMatrix);

        glMatrix.mat4.invert(myNormalMatrix, myMatrix);
        glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);

        cubeWorm1Material.setMaterialInShader(sP_active);

        sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
        objectsVBO.draw("cube");
    }

    let shiveringCubeDrawFunction = function(worldMatrix, _parameters) {
        let myMatrix = glMatrix.mat4.clone(worldMatrix);

        sP_shivering.activate();

        sphereCubeWorm1Material2.setMaterialInShader(sP_shivering);

        sP_shivering.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_shivering.setUniform1F("u_A", 10.0);
        sP_shivering.setUniform1F("u_B", 10.0);
        sP_shivering.setUniform1F("u_C", 5.0);
        sP_shivering.setUniform1F("u_time", Date.now());
        objectsVBO.draw("cube");

        sP_active.activate();
    }

    let sceneGraphBase = new BaseNode("base", viewWorldMatrix, null);
    let sceneGraph = new GroupNode("baseGroup", []);

    let rotationNode = new TransformationNode(
        "rotation",
        function (childWorldMatrix, worldMatrix, _parameters) {
            glMatrix.mat4.rotate(childWorldMatrix, worldMatrix, animator.getValue("cube"), glMatrix.vec3.fromValues(0, 1, 0));
        },
        null
    );

    let translationNode1 = new TransformationNode(
        "translation1",
        function (childWorldMatrix, worldMatrix, _parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(0, 4, 0));
        },
        null
    );

    let translationNode2 = new TransformationNode(
        "translation2",
        function (childWorldMatrix, worldMatrix, _parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(3, 0, 0));
        },
        null
    );

    let cubeDrawNode = new DrawNode("drawCube", cubeDrawFunction);
    let shiveringCubeDrawNode = new DrawNode("drawShiveringCube", shiveringCubeDrawFunction);

    rotationNode.child = cubeDrawNode;
    let groupNode1 = new GroupNode("groupNode1", [rotationNode, translationNode2]);
    translationNode1.child = groupNode1;
    translationNode2.child = shiveringCubeDrawNode;

    sceneGraph.children.push(translationNode1);

    sceneGraphBase.child = sceneGraph;

    let groundDrawNode = new DrawNode(
        "ground",
        function (worldMatrix, _parameters) {
            let myMatrix = glMatrix.mat4.clone(worldMatrix);
            
            sP_ground.activate();
            sP_ground.setUniformMatrix4FV("u_projectionMatrix", perspectiveMatrix);
            sP_ground.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
            groundVBO.draw("ground");
            sP_active.activate();
        }
    );

    sceneGraph.children.push(groundDrawNode);

    // , 32.95444151833879, -31.446755444213434, 8.616349051635954
    let camera = new MovableCamera(35, -30, 9, 1, 150, -10, 0.75, 1);

    keyListener = new KeyStates();

    keyListener.initKeyStates(
        [
            {name: "KeyI", ifDown: function (){camera.updateFacing(0, 1);}},
            {name: "KeyJ", ifDown: function (){camera.updateFacing(1, 0);}},
            {name: "KeyK", ifDown: function (){camera.updateFacing(0, -1);}},
            {name: "KeyL", ifDown: function (){camera.updateFacing(-1, 0);}}
        ]
    );

    window.addEventListener("keydown", (ev) => KeyStates.onKeydown(ev, keyListener), false);
    window.addEventListener("keyup", (ev) => KeyStates.onKeyup(ev, keyListener), false);
    console.log(keyListener.keyStateMap);

    let translationNode3 = new TransformationNode(
        "translation3",
        function (childWorldMatrix, worldMatrix, _parameters) {
            glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(-7, -7, 0));
        },
        null
    );

    let icosphereDrawFunction = function(worldMatrix, _parameters) {
        let myMatrix = glMatrix.mat4.clone(worldMatrix);
        let myNormalMatrix = glMatrix.mat4.clone(_parameters.normalMatrix);

        glMatrix.mat4.scale(myMatrix, myMatrix, glMatrix.vec3.fromValues(3, 3, 3));

        glMatrix.mat4.rotate(myMatrix, myMatrix, animator.getValue("sphere"), glMatrix.vec3.fromValues(0, 0, 1));

        glMatrix.mat4.invert(myNormalMatrix, myMatrix);
        glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);

        bigSphereMaterial.setMaterialInShader(sP_active);

        sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
        objectsVBO.draw("icosphere");
    };

    let icosphereDrawNode = new DrawNode("drawIcosphere", icosphereDrawFunction);

    let icosphereWormDrawFunction = function(worldMatrix, _parameters) {
        let myMatrix = glMatrix.mat4.clone(worldMatrix);
        let myNormalMatrix = glMatrix.mat4.clone(_parameters.normalMatrix);

        glMatrix.mat4.scale(myMatrix, myMatrix, glMatrix.vec3.fromValues(0.3, 0.3, 0.3));

        glMatrix.mat4.invert(myNormalMatrix, myMatrix);
        glMatrix.mat4.transpose(myNormalMatrix, myNormalMatrix);

        sphereWorm1Material.setMaterialInShader(sP_active);

        sP_active.setUniformMatrix4FV("u_modelViewMatrix", myMatrix);
        sP_active.setUniformMatrix4FV("u_normalMatrix", myNormalMatrix);
        objectsVBO.draw("icosphere");
    };

    let icosphereWormDrawNode = new DrawNode("drawIcosphereWorm", icosphereWormDrawFunction);

    translationNode3.child = icosphereDrawNode;
    sceneGraph.children.push(translationNode3);


    sceneGraph.children.push(icosphereWormDrawNode);

    let bigSphereMaterial = new Material("341900", "cc6600", "ffffff", 1.0, 1.0, 1.0, 80);
    let cubeWorm1Material = new Material("000433", "0077cc", "ffffff", 1.0, 0.75, 0.5, 6);
    let sphereWorm1Material = new Material("330012", "cc0044", "ffffff", 0.5, 1.0, 0.33, 40);
    let sphereCubeWorm1Material1 = new Material("003303", "03cc00", "ffffff", 0.2, 0.5, 0.7, 128);
    let sphereCubeWorm1Material2 = new Material("333300", "ccc200", "ffffff", 0.2, 0.85, 0.7, 128);

    sceneGraph.children.push(
        new TransformationNode(
            "cubeSnakeLocation",
            function(childWorldMatrix, worldMatrix, _parameters) {
                glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(2, -13, 0));
                glMatrix.mat4.scale(childWorldMatrix, childWorldMatrix, glMatrix.vec3.fromValues(0.5, 0.5, 0.5));
            },
            makeCubeSnake(cubeWorm1Material)
        )
    );

    sceneGraph.children.push(
        new TransformationNode(
            "sphereSnakeLocation",
            function(childWorldMatrix, worldMatrix, _parameters) {
                glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(-13, 2, 0));
                glMatrix.mat4.scale(childWorldMatrix, childWorldMatrix, glMatrix.vec3.fromValues(0.5, 0.5, 0.5));
                glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, Math.PI * 2 / 3, glMatrix.vec3.fromValues(1, 1, 0));
            },
            makeSphereSnake(sphereWorm1Material)
        )
    );

    sceneGraph.children.push(
        new TransformationNode(
            "cubeSphereSnakeLocation",
            function(childWorldMatrix, worldMatrix, _parameters) {
                glMatrix.mat4.translate(childWorldMatrix, worldMatrix, glMatrix.vec3.fromValues(-10, -10, 0));
                glMatrix.mat4.scale(childWorldMatrix, childWorldMatrix, glMatrix.vec3.fromValues(0.5, 0.5, 0.5));
                glMatrix.mat4.rotate(childWorldMatrix, childWorldMatrix, Math.PI * 2 / 3, glMatrix.vec3.fromValues(0, 1, 0));
            },
            makeCubeSphereSnake(sphereCubeWorm1Material1, sphereCubeWorm1Material2)
        )
    );

    let snakeAnimation1: AnimationState = {
        value: 0,
        rate: 1,
        variables: {maximum: 2 * Math.PI},
        update: function(_currentTime: number, scaledTimeDelta: number, animationState: AnimationState): AnimationState
        {
            let value = animationState.value;
            value += animationState.rate * scaledTimeDelta;
            
            if (value > animationState.variables.maximum) {
                value = 0;
            }
            
            return {value: value, rate: animationState.rate, variables: animationState.variables, update: animationState.update};
        }
    }

    let snakeAnimation2: AnimationState = {
        value: Math.PI/4,
        rate: 0.5,
        variables: {maximum: 2 * Math.PI},
        update: function(_currentTime: number, scaledTimeDelta: number, animationState: AnimationState): AnimationState
        {
            let value = animationState.value;
            value += animationState.rate * scaledTimeDelta;
            
            if (value > animationState.variables.maximum) {
                value = 0;
            }
            
            return {value: value, rate: animationState.rate, variables: animationState.variables, update: animationState.update};
        }
    }

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

    let sphereRotation: AnimationState = {
        value: 0,
        rate: 1,
        variables: {maximum: 2 * Math.PI},
        update: function(_currentTime: number, scaledTimeDelta: number, animationState: AnimationState): AnimationState
        {
            let value = animationState.value;
            value += animationState.rate * scaledTimeDelta;
            
            if (value > animationState.variables.maximum) {
                value = 0;
            }
            
            return {value: value, rate: animationState.rate, variables: animationState.variables, update: animationState.update};
        }
    }
    
    animator.addAnimation("sphere", sphereRotation);

    sceneGraphBase.printGraph();
    
    let tick = function() {
        console.log(`${camera.eyeX}, ${camera.eyeY}, ${camera.eyeZ}, ${camera.lookAtX}, ${camera.lookAtY}, ${camera.lookAtZ}`);
        KeyStates.callFunctions(keyListener);
        
        renderer_gl.viewport(0,
            0,
            canvas!.width,
            canvas!.height
        );

        renderer_gl.clear(renderer_gl.COLOR_BUFFER_BIT | renderer_gl.DEPTH_BUFFER_BIT);
        
        animator.animate();

        perspectiveMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(
            perspectiveMatrix,
            glMatrix.glMatrix.toRadian(35),
            canvas.width / canvas.height,
            0.5,
            5000.0
        );

        viewMatrix = glMatrix.mat4.create();
        glMatrix.mat4.lookAt(
            viewMatrix,
            glMatrix.vec3.fromValues(camera.eyeX, camera.eyeY, camera.eyeZ),
            glMatrix.vec3.fromValues(camera.lookAtX, camera.lookAtY, camera.lookAtZ),
            glMatrix.vec3.fromValues(0, 0, 1),
        );

        sP_active.setUniformMatrix4FV("u_projectionMatrix", perspectiveMatrix);
        sP_active.setUniform3FV("u_eyePosition", [camera.eyeX, camera.eyeY, camera.eyeZ]);

        viewWorldMatrix = glMatrix.mat4.clone(viewMatrix);

        sceneGraphBase.baseWorldMatrix = viewWorldMatrix;

        normalMatrix = glMatrix.mat4.create();
        glMatrix.mat4.invert(normalMatrix, viewWorldMatrix);
        glMatrix.mat4.transpose(normalMatrix, normalMatrix);
        sceneGraphBase.traverseGraph({perspectiveMatrix: perspectiveMatrix, normalMatrix: normalMatrix});
        
        requestAnimationFrame(tick);
    }
    
    tick();
}

function changeShader() {
    let newShaderName = (<HTMLSelectElement>document.getElementById("selectShader"))!.value;
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
