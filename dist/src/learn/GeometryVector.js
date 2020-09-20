import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
var GeometryVector = /** @class */ (function () {
    function GeometryVector() {
        this.clock = new THREE.Clock();
        var scene = new THREE.Scene();
        var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
        var p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
        var p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
        var p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
        var p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标
        //顶点坐标添加到geometry对象
        geometry.vertices.push(p1, p2, p3, p4);
        // Face3构造函数创建一个三角面
        var face1 = new THREE.Face3(0, 1, 2);
        //三角面每个顶点的法向量
        var n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
        var n2 = new THREE.Vector3(0, 0, -1); //三角面2Face2顶点2的法向量
        var n3 = new THREE.Vector3(0, 0, -1); //三角面3Face3顶点3的法向量
        // 设置三角面Face3三个顶点的法向量
        face1.vertexNormals.push(n1, n2, n3);
        face1.vertexColors = [
            new THREE.Color(0xffff00),
            new THREE.Color(0xff00ff),
            new THREE.Color(0x00ffff),
        ];
        // 三角面2
        var face2 = new THREE.Face3(0, 2, 3);
        // 设置三角面法向量
        face2.normal = new THREE.Vector3(0, -1, 0);
        face2.vertexColors = [
            new THREE.Color(0xffff00),
            new THREE.Color(0xff00ff),
            new THREE.Color(0x00ffff),
        ];
        //三角面face1、face2添加到几何体中
        geometry.faces.push(face1, face2);
        var material = new THREE.MeshMatcapMaterial({
            // 使用顶点颜色数据渲染模型，不需要再定义color属性
            vertexColors: true,
            side: THREE.DoubleSide //两面可见
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
    return GeometryVector;
}());
export { GeometryVector };
//# sourceMappingURL=GeometryVector.js.map