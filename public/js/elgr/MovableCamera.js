var MovableCamera = /** @class */ (function () {
    function MovableCamera(eyeX, eyeY, eyeZ, lookAtDistance, theta, phi, movementSpeed, facingSpeed) {
        if (eyeX === void 0) { eyeX = 0; }
        if (eyeY === void 0) { eyeY = 0; }
        if (eyeZ === void 0) { eyeZ = 0; }
        if (lookAtDistance === void 0) { lookAtDistance = 1; }
        if (theta === void 0) { theta = 0; }
        if (phi === void 0) { phi = 0; }
        if (movementSpeed === void 0) { movementSpeed = 1; }
        if (facingSpeed === void 0) { facingSpeed = 1; }
        this.eyeX = eyeX;
        this.eyeY = eyeY;
        this.eyeZ = eyeZ;
        this.lookAtDistance = lookAtDistance;
        this.theta = theta;
        this.phi = phi;
        this.movementSpeed = movementSpeed;
        this.facingSpeed = facingSpeed;
        this.computeLookAt();
    }
    MovableCamera.prototype.computeLookAt = function () {
        this.lookAtX = this.eyeX + this.lookAtDistance * Math.cos(this.theta * Math.PI / 180) * Math.cos(this.phi * Math.PI / 180);
        this.lookAtY = this.eyeY + this.lookAtDistance * Math.sin(this.theta * Math.PI / 180) * this.lookAtDistance * Math.cos(this.phi * Math.PI / 180);
        this.lookAtZ = this.eyeZ + Math.sin(this.phi * Math.PI / 180);
    };
    MovableCamera.prototype.updatePosition = function (x, y, z, absolute) {
        if (absolute === void 0) { absolute = false; }
        if (absolute) {
            this.eyeX += x;
            this.eyeY += y;
            this.eyeZ += z;
            this.computeLookAt();
            return;
        }
        var dCos = this.movementSpeed * Math.cos(this.theta * Math.PI / 180) * Math.cos(this.phi * Math.PI / 180);
        var dSin = Math.sin(this.theta * Math.PI / 180) * Math.cos(this.phi * Math.PI / 180);
        this.eyeX += this.movementSpeed * (x * dCos - y * dSin);
        this.eyeY += this.movementSpeed * (x * dSin + y * dCos);
        this.eyeZ += this.movementSpeed * x * Math.sin(this.phi * Math.PI / 180);
        this.computeLookAt();
    };
    MovableCamera.prototype.updateFacing = function (theta, phi, absolute) {
        if (absolute === void 0) { absolute = false; }
        if (absolute) {
            this.theta += theta;
            this.phi += phi;
            this.computeLookAt();
            return;
        }
        this.theta += theta * this.facingSpeed;
        this.phi += phi * this.facingSpeed;
        this.computeLookAt();
    };
    return MovableCamera;
}());