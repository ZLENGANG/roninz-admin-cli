var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import * as THREE from "three";
export class MoveTo {
    constructor(start, end, v) {
        this.manhattanDistanceTo = () => {
            return this.start.manhattanDistanceTo(this.end);
        };
        this.start = start;
        this.end = end;
        this.v = v ? v : Math.ceil(this.manhattanDistanceTo() / 200);
        this.manhattanDistanceToNumber = 0;
    }
    setSpeed(v) {
        this.v = v;
    }
    move() {
        const delta = new THREE.Vector3()
            .subVectors(this.end, this.start)
            .normalize();
        const manhattanDistanceTo = this.manhattanDistanceTo();
        if (manhattanDistanceTo < this.v && manhattanDistanceTo >= 1) {
            this.start.addScaledVector(delta, 1);
        }
        else if (manhattanDistanceTo > this.v) {
            this.start.addScaledVector(delta, this.v);
        }
        if (this.manhattanDistanceToNumber === Math.floor(manhattanDistanceTo)) {
            return 0;
        }
        this.manhattanDistanceToNumber = Math.floor(manhattanDistanceTo);
        return manhattanDistanceTo;
    }
}
/**
 *巡逻
 * @param {} params
 * @param {} params.three3D 场景
 * @param {} params.coordArray 坐标数组
 * @param {} params.meshName 模型名称
 * @param {} params.isFirstPerson 是否是第三人称
 * @param {} params.modelType 跟随的是模型还是图标
 * @param {} params.factor 移动因素 1  |10  |100
 */
export class Patrol {
    constructor(params) {
        const { three3D, coordArray, meshName = "", isFirstPerson = false, modelType = "mash", factor = 1, } = params;
        this.isFirstPerson = isFirstPerson;
        this.three3D = three3D;
        this.meshName = meshName;
        this.isStop = false;
        this.modelType = modelType;
        this.factor = factor;
        // 总路长
        let distanceToPoint = 0;
        const points = coordArray.map((p) => new THREE.Vector3(p.x, p.y, p.z));
        points.forEach((p, i) => {
            if (i !== 0 && points[i + 1]) {
                distanceToPoint += p.distanceTo(points[i + 1]);
            }
        });
        console.log("距离", distanceToPoint);
        const curve = new THREE.CatmullRomCurve3(points, false);
        this.curvePoints = curve.getPoints(distanceToPoint * (100 / factor));
        // this.init();
    }
    init() {
        console.log("初始化");
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const vm = this;
        function stepGen() {
            return __asyncGenerator(this, arguments, function* stepGen_1() {
                for (let i = 0; i < vm.curvePoints.length; i++) {
                    yield yield __await(vm.step(vm.curvePoints, i));
                }
                yield yield __await(false);
            });
        }
        this.runGen = stepGen();
    }
    stop() {
        this.isStop = true;
    }
    run() {
        if (!this.isStop && this.runGen)
            return;
        if (!this.runGen) {
            this.init();
        }
        this.isStop = false;
        if (this.isFirstPerson) {
            this.three3D.Three.removeControls();
        }
        this.asyncGenerator(this.runGen);
    }
    switch(flag) {
        this.isFirstPerson = flag;
        if (this.isFirstPerson) {
            this.three3D.Three.removeControls();
        }
        else {
            this.three3D.Three.initControls();
        }
    }
    async asyncGenerator(g) {
        g.next().then((v) => {
            if (!v || !v.value) {
                if (this.isFirstPerson) {
                    this.three3D.Three.initControls();
                }
                this.runGen = null;
                return;
            }
            if (this.isStop) {
                if (this.isFirstPerson) {
                    this.three3D.Three.initControls();
                }
                return;
            }
            setTimeout(() => {
                this.asyncGenerator(g);
            }, 1);
        });
    }
    step(point, i) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const vm = this;
        return new Promise((res, rej) => {
            if (!this.three3D)
                return rej(false);
            if (this.modelType === "mash") {
                vm._runModel(point, i, res, vm);
            }
            else {
                vm._runSprite(point, i, res, vm);
            }
        });
    }
    _runModel(point, i, res, vm) {
        var _a, _b;
        if (this.meshName) {
            this.three3D.ModelThree.modelMove(this.meshName, point[i], true, 1, function () {
                res(true);
            }, function (position) {
                var _a, _b;
                if (vm.isFirstPerson) {
                    (_a = vm.three3D) === null || _a === void 0 ? void 0 : _a.Three.setCameraPositions(position);
                    (_b = vm.three3D) === null || _b === void 0 ? void 0 : _b.Three.setCameraLookAt(point[i]);
                }
            });
        }
        else {
            res(true);
            if (vm.isFirstPerson) {
                (_a = this.three3D) === null || _a === void 0 ? void 0 : _a.Three.setCameraPositions(point[i]);
                (_b = this.three3D) === null || _b === void 0 ? void 0 : _b.Three.setCameraLookAt(point[i + 1]);
            }
        }
    }
    _runSprite(point, i, res, vm) {
        var _a, _b;
        if (this.meshName) {
            this.three3D.SpriteThree.setLabelPostion(this.meshName, point[i]);
        }
        else {
            if (vm.isFirstPerson) {
                (_a = this.three3D) === null || _a === void 0 ? void 0 : _a.Three.setCameraPositions(point[i]);
                (_b = this.three3D) === null || _b === void 0 ? void 0 : _b.Three.setCameraLookAt(point[i + 1]);
            }
        }
        res(true);
    }
}
