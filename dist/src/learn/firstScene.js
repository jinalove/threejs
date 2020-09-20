import * as THREE from "three";
import { OrbitControls } from "./../../node_modules/three/examples/jsm/controls/OrbitControls";
var First = /** @class */ (function () {
    function First() {
        this.clock = new THREE.Clock();
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh); //网格模型添加到场景中
        // 球体网格模型
        var geometry2 = new THREE.SphereGeometry(60, 40, 40);
        var material2 = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            opacity: 0.7,
            transparent: true
        });
        var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
        mesh2.translateY(120); //球体网格模型沿Y轴正方向平移120
        scene.add(mesh2);
        // 圆柱网格模型
        var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
        var material3 = new THREE.MeshLambertMaterial({
            color: 0xffff00
        });
        var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
        // mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
        mesh3.position.set(120, 0, 0); //设置mesh3模型对象的xyz坐标为120,0,0
        scene.add(mesh3); //
        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        // point.position.set(0, 0, 0);
        //环境光
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)
        /**
         * 相机设置
         */
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
        //controls.addEventListener('change', render);//监听鼠标、键盘事件
        //this.T0 = new Date();//上次时间
        function render() {
            // let T1 = new Date();//本次时间
            // let t = T1.getTime()- this.T0.getTime() ;//时间差
            // this.T0 = T1;//把本次时间赋值给上次时间
            requestAnimationFrame(render);
            renderer.render(scene, camera); //执行渲染操作
            mesh.rotateY(0.01); //旋转角速度0.001弧度每毫秒
        }
        render();
        // window.setInterval("render()",20);
        // 立方体网格模型
        // var geometry1 = new THREE.BoxGeometry(100, 100, 100);
        // var material1 = new THREE.MeshLambertMaterial({
        // color: 0x0000ff
        // }); //材质对象Material
        // var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
        // this.scene.add(mesh1); //网格模型添加到场景中
        // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
        // var axisHelper = new THREE.AxisHelper(250);
        // this.scene.add(axisHelper);
    }
    return First;
}());
export { First };
//# sourceMappingURL=firstScene.js.map