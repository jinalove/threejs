import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
var Position = /** @class */ (function () {
    function Position() {
        this.clock = new THREE.Clock();
        /**
    * 创建场景对象Scene
    */
        var scene = new THREE.Scene();
        /**
       * 创建网格模型
       */
        var geometry = new THREE.BoxGeometry(20, 20, 20); //创建一个立方体几何对象Geometry
        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        mesh.position.set(50, 0, 0);
        var group = new THREE.Group();
        group.add(mesh); //网格模型添加到组中
        group.position.set(50, 0, 0);
        scene.add(group); //组添加到场景中
        // 获得世界坐标
        //该语句默认在threejs渲染的过程中执行  如果想获得世界矩阵属性、世界位置属性等属性，需要手动更新
        scene.updateMatrixWorld(true);
        var worldPosition = new THREE.Vector3();
        mesh.getWorldPosition(worldPosition);
        console.log('世界坐标', worldPosition);
        console.log('本地坐标', mesh.position);
        // 坐标系辅助显示
        var axesHelper = new THREE.AxesHelper(200);
        scene.add(axesHelper);
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
        /**
         * 相机设置
         */
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
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
        // 渲染函数
        function render() {
            renderer.render(scene, camera); //执行渲染操作
        }
        render();
        var controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
        controls.addEventListener('change', render); //监听鼠标、键盘事件
    }
    return Position;
}());
export { Position };
//# sourceMappingURL=Position.js.map