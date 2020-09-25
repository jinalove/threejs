import * as THREE from "three"
import  { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
class CurveModelMultiPath {

    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    mesh: THREE.Mesh

    controls: any
    clock: THREE.Clock = new THREE.Clock()
    T0: Date
    constructor() {
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        // 创建多段线条的顶点数据
        var p1 = new THREE.Vector3(-85.35, -35.36)
        var p2 = new THREE.Vector3(-50, 0, 0);
        var p3 = new THREE.Vector3(0, 50, 0);
        var p4 = new THREE.Vector3(50, 0, 0);
        var p5 = new THREE.Vector3(85.35, -35.36);
   
        // 创建线条一：直线
        let line1 = new THREE.LineCurve3(p1,p2);
        // 重建线条2：三维样条曲线
        var curve = new THREE.CatmullRomCurve3([p2, p3, p4]);
        // 创建线条3：直线
        let line2 = new THREE.LineCurve3(p4,p5);
        var CurvePath:THREE.CurvePath<THREE.Vector3> = new THREE.CurvePath<THREE.Vector3>();// 创建CurvePath对象
        CurvePath.curves.push(line1, curve, line2);// 插入多段线条
        //通过多段曲线路径创建生成管道
        //通过多段曲线路径创建生成管道，CCurvePath：管道路径
        var geometry2 = new THREE.TubeGeometry(CurvePath , 100, 5, 25, false);
        var material2 = new THREE.MeshPhongMaterial({
        color: 0xE6A23C,
        side: THREE.DoubleSide,//双面可见
        }); //材质对象
        var mesh = new THREE.Mesh(geometry2, material2);
        scene.add(mesh);
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
        renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

        var controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
        controls.addEventListener('change', render);//监听鼠标、键盘事件
        //this.T0 = new Date();//上次时间
        function render() {
            // let T1 = new Date();//本次时间
            // let t = T1.getTime()- this.T0.getTime() ;//时间差
            // this.T0 = T1;//把本次时间赋值给上次时间
            //requestAnimationFrame(render);
            renderer.render(scene,camera);//执行渲染操作
           
        }
     
        render();
  
    }
}

export { CurveModelMultiPath }
