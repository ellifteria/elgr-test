var Color = /** @class */ (function () {
    function Color(hex, r, g, b) {
        if (hex === void 0) { hex = "000000"; }
        if (r === void 0) { r = 0.0; }
        if (g === void 0) { g = 0.0; }
        if (b === void 0) { b = 0.0; }
        this.hex = hex;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    Color.fromHex = function (hex) {
        var hexAsInt = parseInt(hex, 16);
        var r = (((hexAsInt >> 16) & 0xFF) / 0xFF);
        var g = (((hexAsInt >> 8) & 0xFF) / 0xFF);
        var b = (((hexAsInt >> 0) & 0xFF) / 0xFF);
        return new Color(hex, r, g, b);
    };
    Color.fromHexArray = function (hexArray) {
        return hexArray.map(Color.fromHex);
    };
    Color.prototype.toFloat32Array = function () {
        return Float32Array.from([this.r, this.g, this.b]);
    };
    return Color;
}());
var Material = /** @class */ (function () {
    function Material(ambientColor, diffuseColor, specularColor, Ka, Kd, Ks, shininess) {
        this.ambientColor = ambientColor;
        this.diffuseColor = diffuseColor;
        this.specularColor = specularColor;
        this.Ka = Ka;
        this.Ks = Ks;
        this.Kd = Kd;
        this.shininess = shininess;
    }
    Material.prototype.setMaterialInShader = function (shader) {
        var ambientColorArray = Color.fromHex(this.ambientColor).toFloat32Array();
        var diffuseColorArray = Color.fromHex(this.diffuseColor).toFloat32Array();
        var specularColorArray = Color.fromHex(this.specularColor).toFloat32Array();
        shader.setUniform1F("u_Ka", this.Ka);
        shader.setUniform1F("u_Kd", this.Kd);
        shader.setUniform1F("u_Ks", this.Ks);
        shader.setUniform1F("u_shininessValue", this.shininess);
        shader.setUniform3FV("u_ambientColor", glMatrix.vec3.fromValues(ambientColorArray[0], ambientColorArray[1], ambientColorArray[2]));
        shader.setUniform3FV("u_diffuseColor", glMatrix.vec3.fromValues(diffuseColorArray[0], diffuseColorArray[1], diffuseColorArray[2]));
        shader.setUniform3FV("u_specularColor", glMatrix.vec3.fromValues(specularColorArray[0], specularColorArray[1], specularColorArray[2]));
    };
    return Material;
}());