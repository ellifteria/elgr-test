function clamp(value, min, max) {
    if (max < min) {
        console.log("exception in clamp: max cannot be less than min");
        return [value, 0];
    }
    var direction;
    if (value <= min) {
        value = min;
        direction = 1;
    }
    if (value >= max) {
        value = max;
        direction = -1;
    }
    return [value, direction];
}
var Animator = /** @class */ (function () {
    function Animator() {
        this.startTime = Date.now();
        this.lastTime = this.startTime;
        this.animations = new Map();
    }
    Animator.prototype.addAnimation = function (animationName, animationState) {
        this.animations.set(animationName, animationState);
    };
    Animator.prototype.animate = function () {
        var currentTime = Date.now();
        var timeDelta = currentTime - this.lastTime;
        var animatorFunction = function (value, key, map) {
            var newAnimationState = value.update(currentTime, timeDelta / 1000, value);
            map.set(key, newAnimationState);
        };
        this.animations.forEach(animatorFunction);
        this.lastTime = currentTime;
    };
    Animator.prototype.getValue = function (animationName) {
        return this.animations.get(animationName).value;
    };
    return Animator;
}());