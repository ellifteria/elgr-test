---
title: Project C
date: 24-03-08
template: page
---

<script type="x-shader/x-vertex" id="groundVertexShader">
  precision mediump float;
  attribute vec3 a_position;
  attribute vec3 a_color;
  uniform mat4 u_projectionMatrix, u_modelViewMatrix;
  varying vec3 v_color;

  void main(){
    vec4 vertPos4 = u_modelViewMatrix * vec4(a_position, 1.0);
    gl_Position = u_projectionMatrix * vertPos4;

    v_color = a_color;
  }
</script>

<script type="x-shader/x-fragment" id="groundFragmentShader">
  precision mediump float;
  varying vec3 v_color;
  
  void main() {
    gl_FragColor = vec4(v_color, 1.0);
  }
</script>

<script type="x-shader/x-vertex" id="shiveringVertexShader">
  precision mediump float;
  attribute vec3 a_position;
  attribute vec3 a_color;
  uniform mat4 u_projectionMatrix, u_modelViewMatrix;
  uniform float u_A, u_B, u_C, u_time;
  varying vec3 v_color;

  void main(){
    vec3 position = a_position;
    position.x = position.x * (1.0 + 0.01*u_A*sin(0.01*u_B * position.z + 0.001*u_C * u_time));
    position.y = position.y * (1.0 + 0.01*u_A*sin(0.01*u_B * position.z + 0.001*u_C * u_time));
    vec4 vertPos4 = u_modelViewMatrix * vec4(position, 1.0);
    gl_Position = u_projectionMatrix * vertPos4;

    v_color = a_color;
  }
</script>

<script type="x-shader/x-fragment" id="shiveringFragmentShader">
  precision mediump float;
  varying vec3 v_color;
  
  void main() {
    gl_FragColor = vec4(v_color, 1.0);
  }
</script>

<script type="x-shader/x-vertex" id="phongPhongVertexShader">
  attribute vec3 a_position;
  attribute vec3 a_normal;

  uniform mat4 u_projectionMatrix, u_modelViewMatrix, u_normalMatrix;

  varying vec3 v_normalInterp;
  varying vec3 v_vertexPos;

  void main(){
    vec4 vertPos4 = u_modelViewMatrix * vec4(a_position, 1.0);
    v_vertexPos = vec3(vertPos4) / vertPos4.w;
    v_normalInterp = vec3(u_normalMatrix * vec4(a_normal, 0.0));
    gl_Position = u_projectionMatrix * vertPos4;
  }
</script>

<script type="x-shader/x-fragment" id="phongPhongFragmentShader">
  precision mediump float;
  varying vec3 v_normalInterp;  // Surface normal
  varying vec3 v_vertexPos;       // Vertex position
  
  uniform float u_Ka;   // Ambient reflection coefficient
  uniform float u_Kd;   // Diffuse reflection coefficient
  uniform float u_Ks;   // Specular reflection coefficient
  uniform float u_shininessValue; // Shininess
  // Material color
  uniform vec3 u_ambientColor;
  uniform vec3 u_diffuseColor;
  uniform vec3 u_specularColor;
  uniform vec3 u_lightPos; // Light position

  void main() {
    vec3 N = normalize(v_normalInterp);
    vec3 L = normalize(u_lightPos - v_vertexPos);

    // Lambert's cosine law
    float lambertian = max(dot(N, L), 0.0);
    float specular = 0.0;
    if(lambertian > 0.0) {
    vec3 R = reflect(-L, N);      // Reflected light vector
    vec3 V = normalize(-v_vertexPos); // Vector to viewer
    // Compute the specular term
    float specAngle = max(dot(R, V), 0.0);
      specular = pow(specAngle, u_shininessValue);
    }
    gl_FragColor = vec4(u_Ka * u_ambientColor +
    u_Kd * lambertian * u_diffuseColor +
    u_Ks * specular * u_specularColor, 1.0);
}
</script>

<script type="x-shader/x-vertex" id="blinnPhongPhongVertexShader">
  attribute vec3 a_position;
  attribute vec3 a_normal;

  uniform mat4 u_projectionMatrix, u_modelViewMatrix, u_normalMatrix;

  varying vec3 v_normalInterp;
  varying vec3 v_vertexPos;

  void main(){
    vec4 vertPos4 = u_modelViewMatrix * vec4(a_position, 1.0);
    v_vertexPos = vec3(vertPos4) / vertPos4.w;
    v_normalInterp = vec3(u_normalMatrix * vec4(a_normal, 0.0));
    gl_Position = u_projectionMatrix * vertPos4;
  }
</script>

<script type="x-shader/x-fragment" id="blinnPhongPhongFragmentShader">
  precision mediump float;
  varying vec3 v_normalInterp;  // Surface normal
  varying vec3 v_vertexPos;       // Vertex position
  
  uniform float u_Ka;   // Ambient reflection coefficient
  uniform float u_Kd;   // Diffuse reflection coefficient
  uniform float u_Ks;   // Specular reflection coefficient
  uniform float u_shininessValue; // Shininess
  // Material color
  uniform vec3 u_ambientColor;
  uniform vec3 u_diffuseColor;
  uniform vec3 u_specularColor;
  uniform vec3 u_lightPos; // Light position

  void main() {
    vec3 N = normalize(v_normalInterp);
    vec3 L = normalize(u_lightPos - v_vertexPos);

    // Lambert's cosine law
    float lambertian = max(dot(N, L), 0.0);
    float specular = 0.0;
    if(lambertian > 0.0) {
      vec3 V = normalize(-v_vertexPos); // Vector to viewer
      vec3 H = normalize(V + normalize(-u_lightPos));      // Reflected light vector
      // Compute the specular term
      float specAngle = max(dot(H, N), 0.0);
      specular = pow(specAngle, u_shininessValue);
    }

    gl_FragColor = vec4(u_Ka * u_ambientColor +
    u_Kd * lambertian * u_diffuseColor +
    u_Ks * specular * u_specularColor, 1.0);
}
</script>


<script type="x-shader/x-vertex" id="phongGourandVertexShader">
  attribute vec3 a_position;
  attribute vec3 a_normal;

  uniform mat4 u_projectionMatrix, u_modelViewMatrix, u_normalMatrix;

  varying vec3 v_normalInterp;
  varying vec3 v_vertexPos;

  uniform float u_Ka;   // Ambient reflection coefficient
  uniform float u_Kd;   // Diffuse reflection coefficient
  uniform float u_Ks;   // Specular reflection coefficient
  uniform float u_shininessValue; // Shininess
  // Material color
  uniform vec3 u_ambientColor;
  uniform vec3 u_diffuseColor;
  uniform vec3 u_specularColor;
  uniform vec3 u_lightPos; // Light position
  
  varying vec4 v_color; //color

  void main(){
    vec4 vertPos4 = u_modelViewMatrix * vec4(a_position, 1.0);
    v_vertexPos = vec3(vertPos4) / vertPos4.w;
    v_normalInterp = vec3(u_normalMatrix * vec4(a_normal, 0.0));
    gl_Position = u_projectionMatrix * vertPos4;

    vec3 N = normalize(v_normalInterp);
    vec3 L = normalize(u_lightPos - v_vertexPos);
    // Lambert's cosine law
    float lambertian = max(dot(N, L), 0.0);
    float specular = 0.0;
    if(lambertian > 0.0) {
    vec3 R = reflect(-L, N);      // Reflected light vector
    vec3 V = normalize(-v_vertexPos); // Vector to viewer
    // Compute the specular term
    float specAngle = max(dot(R, V), 0.0);
      specular = pow(specAngle, u_shininessValue);
    }
    v_color = vec4(u_Ka * u_ambientColor +
    u_Kd * lambertian * u_diffuseColor +
    u_Ks * specular * u_specularColor, 1.0);
  }
</script>

<script type="x-shader/x-fragment" id="phongGourandFragmentShader">
  precision mediump float;
  varying vec4 v_color;
  
  void main() {
    gl_FragColor = v_color;
  }
</script>

<script type="x-shader/x-vertex" id="blinnPhongGourandVertexShader">
  attribute vec3 a_position;
  attribute vec3 a_normal;

  uniform mat4 u_projectionMatrix, u_modelViewMatrix, u_normalMatrix;
  
  uniform vec3 u_eyePosition;

  varying vec3 v_normalInterp;
  varying vec3 v_vertexPos;

  uniform float u_Ka;   // Ambient reflection coefficient
  uniform float u_Kd;   // Diffuse reflection coefficient
  uniform float u_Ks;   // Specular reflection coefficient
  uniform float u_shininessValue; // Shininess
  // Material color
  uniform vec3 u_ambientColor;
  uniform vec3 u_diffuseColor;
  uniform vec3 u_specularColor;
  uniform vec3 u_lightPos; // Light position
  
  varying vec4 v_color; //color

  void main(){
    vec4 vertPos4 = u_modelViewMatrix * vec4(a_position, 1.0);
    v_vertexPos = vec3(vertPos4) / vertPos4.w;
    v_normalInterp = vec3(u_normalMatrix * vec4(a_normal, 0.0));
    gl_Position = u_projectionMatrix * vertPos4;

    vec3 N = normalize(v_normalInterp);
    vec3 L = normalize(u_lightPos - v_vertexPos);
    // Lambert's cosine law
    float lambertian = max(dot(N, L), 0.0);
    float specular = 0.0;
    if(lambertian > 0.0) {
      vec3 V = normalize(-v_vertexPos); // Vector to viewer
      vec3 H = normalize(V + normalize(-u_lightPos));      // Reflected light vector
      // Compute the specular term
      float specAngle = max(dot(H, N), 0.0);
      specular = pow(specAngle, u_shininessValue);
    }
    v_color = vec4(u_Ka * u_ambientColor +
    u_Kd * lambertian * u_diffuseColor +
    u_Ks * specular * u_specularColor, 1.0);
  }
</script>

<script type="x-shader/x-fragment" id="blinnPhongGourandFragmentShader">
  precision mediump float;
  varying vec4 v_color;
  
  void main() {
    gl_FragColor = v_color;
  }
</script>


<script src="./js/elgr/compiled/Renderer.js"></script>
<script src="./js/elgr/compiled/Shapes.js"></script>
<script src="./js/elgr/compiled/GroundPlane.js"></script>
<script src="./js/webgl-utils/compiled/WebGLUtils.js"></script>
<script src="./js/elgr/compiled/Animator.js"></script>
<script src="./js/elgr/compiled/SceneGraph.js"></script>
<script src="./js/elgr/compiled/MovableCamera.js"></script>
<script src="./js/elgr/compiled/KeyListener.js"></script>
<script src="./js/elgr/compiled/Material.js"></script>

<script src="./js/gl-matrix.js"></script>

<script src="./index.js"></script>

<div class="centeredContainer">
    <canvas id="webglCanvas" width="600" height="600">
        Please use a browser that supports "canvas"
    </canvas>
</div>

Use the keyboard to control the camera:

- `I` look up
- `J` look left
- `L` look right
- `K` look down

Shader:

<select onchange="changeShader()" id="selectShader">
  <option value="phong">Phong</option>
  <option value="gourand">Gourand</option>
</select>
