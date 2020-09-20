import * as THREE from "three";
import { OrbitControls } from "./../../node_modules/three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
var Sphere = /** @class */ (function () {
    function Sphere() {
    }
    Sphere.prototype.sphere1 = function (r) {
        var _geo = new THREE.SphereGeometry(r, 32, 32);
        var _mat = new THREE.MeshNormalMaterial();
        var _s = new THREE.Mesh(_geo, _mat);
        return _s;
    };
    Sphere.prototype.sphere2 = function (r) {
        var _geo = new THREE.BoxGeometry(r, 4, 4);
        var _mat = new THREE.MeshNormalMaterial();
        var _s = new THREE.Mesh(_geo, _mat);
        return _s;
    };
    return Sphere;
}());
var Threescene = /** @class */ (function () {
    function Threescene() {
        var _this = this;
        this.clock = new THREE.Clock();
        this.onWindowResize = function () {
            _this.camera.aspect = window.innerWidth / window.innerHeight;
            _this.camera.updateProjectionMatrix();
            _this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        this.animate = function () {
            requestAnimationFrame(_this.animate);
            _this.render();
        };
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.init();
        window.addEventListener('resize', this.onWindowResize, false);
    }
    Threescene.prototype.addObject = function () {
        var sp1 = new Sphere();
        var s1 = sp1.sphere1(4);
        this.scene.add(s1);
        var s2 = sp1.sphere2(4);
        s2.position.set(8, 0, 0);
        this.scene.add(s2);
    };
    Threescene.prototype.testTween = function () {
        var _geo = new THREE.SphereGeometry(1, 32, 32);
        var _mat = new THREE.MeshNormalMaterial();
        var _s = new THREE.Mesh(_geo, _mat);
        this.scene.add(_s);
        var p = { x: 0, y: 0 };
        var p1 = 30;
        var tween = new TWEEN.Tween(p).to({ x: 80, y: p1 }, 1000)
            .easing(TWEEN.Easing.Exponential.Out)
            .onUpdate(function () {
            _s.position.set(-5, p.y, 0);
        })
            .onComplete(function () {
        });
        //TWEEN.start(); 
        var tweenBack = new TWEEN.Tween(p).to({ x: 0, y: 0 }, 1000)
            .easing(TWEEN.Easing.Exponential.In)
            .onUpdate(function () {
            _s.position.set(-5, p.y, 0);
        });
        tween.chain(tweenBack);
        tweenBack.chain(tween);
    };
    Threescene.prototype.init = function () {
        this.camera.position.set(-40, 40, 40);
        this.camera.lookAt(this.scene.position);
        this.renderer.setClearColor(0x222222);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.scene.add(new THREE.AxesHelper(10));
        this.linght();
        this.animate();
    };
    Threescene.prototype.linght = function () {
        var light = new THREE.AmbientLight(0xFFFFFF, 1);
        this.scene.add(light);
    };
    Threescene.prototype.render = function () {
        var delta = this.clock.getDelta();
        this.renderer.render(this.scene, this.camera);
        this.controls.update(delta);
        TWEEN.update(0, true);
        //console.log(delta)
    };
    return Threescene;
}());
export { Threescene };
//# sourceMappingURL=scene.js.map