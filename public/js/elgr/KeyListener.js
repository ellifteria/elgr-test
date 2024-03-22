var KeyStates = /** @class */ (function () {
    function KeyStates() {
        this.keyStateMap = new Map();
    }
    KeyStates.prototype.initKeyStates = function (keys) {
        console.log(this.keyStateMap);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            this.keyStateMap.set(key.name, { value: false, ifKeydown: key.ifDown });
        }
        console.log(this.keyStateMap);
    };
    KeyStates.onKeydown = function (ev, keyStateMap) {
        if (!keyStateMap.keyStateMap.has(ev.code)) {
            return;
        }
        var keyFunction = keyStateMap.keyStateMap.get(ev.code).ifKeydown;
        keyStateMap.keyStateMap.set(ev.code, { value: true, ifKeydown: keyFunction });
    };
    KeyStates.onKeyup = function (ev, keyStateMap) {
        if (!keyStateMap.keyStateMap.has(ev.code)) {
            return;
        }
        var keyFunction = keyStateMap.keyStateMap.get(ev.code).ifKeydown;
        keyStateMap.keyStateMap.set(ev.code, { value: false, ifKeydown: keyFunction });
    };
    KeyStates.callFunctions = function (keyStateMap) {
        var callerFunction = function (value, key, map) {
            if (value.value) {
                value.ifKeydown();
            }
        };
        keyStateMap.keyStateMap.forEach(callerFunction);
    };
    return KeyStates;
}());