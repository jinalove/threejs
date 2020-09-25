import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
var GeometryModel = /** @class */ (function () {
    function GeometryModel() {
        this.clock = new THREE.Clock();
        var scene = new THREE.Scene();
        var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        // 遍历几何体的face属性
        geometry.faces.forEach(function (face) {
            // 设置三角面face三个顶点的颜色
            face.vertexColors = [
                new THREE.Color(0xffff00),
                new THREE.Color(0xff00ff),
                new THREE.Color(0x00ffff),
            ];
        });
        // geometry.faces.pop();
        // geometry.faces.pop();
        // geometry.faces.shift();
        // geometry.faces.shift();
        geometry.scale(2, 2, 2);
        // 几何体沿着x轴平移50
        geometry.translate(50, 0, 0);
        // 几何体绕着x轴旋转45度
        geometry.rotateX(Math.PI / 4);
        geometry.rotateY(Math.PI / 5);
        geometry.rotateZ(Math.PI / 5);
        // 居中：偏移的几何体居中
        geometry.center();
        console.log(geometry.vertices);
        var material = new THREE.MeshBasicMaterial({
            // color: 0x0000ff,
            vertexColors: true,
            side: THREE.DoubleSide,
        });
        var mesh = new THREE.Mesh(geometry, material); //模型对象
        scene.add(mesh); //网格对象添加到场景
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
        var controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
        controls.addEventListener('change', render); //监听鼠标、键盘事件
        //this.T0 = new Date();//上次时间
        function render() {
            // let T1 = new Date();//本次时间
            // let t = T1.getTime()- this.T0.getTime() ;//时间差
            // this.T0 = T1;//把本次时间赋值给上次时间
            //requestAnimationFrame(render);
            renderer.render(scene, camera); //执行渲染操作
        }
        render();
    }
    return GeometryModel;
}());
export { GeometryModel };
//# sourceMappingURL=GeometryModel.js.map