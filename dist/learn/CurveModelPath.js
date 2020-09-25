import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
var CurveModelPath = /** @class */ (function () {
    function CurveModelPath() {
        this.clock = new THREE.Clock();
        var scene = new THREE.Scene();
        /**
     * 创建管道网格模型
     */
        //创建管道成型的路径(3D样条曲线)
        var path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-10, -50, -50),
            new THREE.Vector3(10, 0, 0),
            new THREE.Vector3(8, 50, 50),
            new THREE.Vector3(-5, 0, 100),
            new THREE.Vector3(85.35, -200, 400)
        ]);
        // LineCurve3创建直线段路径
        // var path = new THREE.LineCurve3(new THREE.Vector3(0, 100, 0), new THREE.Vector3(0, 0, 0));
        // TubeGeometry对2D曲线支持不太好
        // var path = new THREE.LineCurve(new THREE.Vector2(0, 100), new THREE.Vector2(0, 0));
        // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
        var geometry = new THREE.TubeGeometry(path, 100, 2, 25);
        // 控制台查看的TubeBufferGeometry结构
        // console.log(geometry.attributes.position);
        // console.log(geometry.index);
        var material = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide //两面可见
        }); //材质对象
        // material.wireframe = true;//线条模式渲染(查看细分数)
        var mesh = new THREE.Mesh(geometry, material); //管道网格模型对象
        scene.add(mesh); //管道网格模型添加到场景中
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
    return CurveModelPath;
}());
export { CurveModelPath };
//# sourceMappingURL=CurveModelPath.js.map