import * as THREE from "three";
import { OrbitControls } from "./../../node_modules/three/examples/jsm/controls/OrbitControls";
var CurveFace = /** @class */ (function () {
    function CurveFace() {
        this.clock = new THREE.Clock();
        var scene = new THREE.Scene();
        var width = 10, height = 6;
        var width_segments = 1, height_segments = 39; // 平面几何体长宽面分段数
        var plane = new THREE.PlaneGeometry(width, height, width_segments, height_segments); // 创建平面几何体
        /*
        * 用vertices属性获取顶点队列，然后遍历
        *  Z轴坐标值可根据需要自行修改计算函数
        */
        var m, n;
        for (var i = 0; i < plane.vertices.length / 2; i++) {
            //plane1.vertices[2*i].z = Math.pow(2, i/10);
            //plane1.vertices[2*i+1].z = Math.pow(2, i/10);
            m = Math.abs(plane.vertices[2 * i].x) + Math.abs(plane.vertices[2 * i].y);
            n = Math.abs(plane.vertices[2 * i + 1].x) + Math.abs(plane.vertices[2 * i + 1].y);
            plane.vertices[2 * i].z = m / (i + 1.5);
            plane.vertices[2 * i + 1].z = n / (i + 1.5);
        }
        var texture_plan = new THREE.TextureLoader().load("./../assets/style.jpg"); // 创建材质
        var mesh_plan = new THREE.Mesh(plane, new THREE.MeshLambertMaterial({ map: texture_plan, side: THREE.DoubleSide, transparent: true }));
        scene.add(mesh_plan);
        /**
        * 光源设置
        */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
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
    return CurveFace;
}());
export { CurveFace };
//# sourceMappingURL=CurveFace.js.map