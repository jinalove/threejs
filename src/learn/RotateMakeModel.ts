import * as THREE from "three"
import  { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
class RotateMakeModel {

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
         * 创建旋转网格模型
         */
        // 三个顶点构成的轮廓（理解为两条相连的直线段）
        // Vector2对象作为元素构成的数组
        var points = [
            new THREE.Vector2(0,60),
            new THREE.Vector2(50,60),
            new THREE.Vector2(50,-60),
            new THREE.Vector2(0,-60),
        ];
        // 30:旋转方向细分数   0,2*Math.PI：旋转起始角度设置
        var geometry = new THREE.LatheGeometry(points,30,0,Math.PI);
        var material=new THREE.MeshPhongMaterial({
            color:0x0000ff,//三角面颜色
            side:THREE.DoubleSide//两面可见
        });//材质对象
        // material.wireframe = true;//线条模式渲染(查看细分数)
        var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
        scene.add(mesh);//旋转网格模型添加到场景中


        /**
         * 创建旋转网格模型
         */
        var points = [
            new THREE.Vector2(50,60),
            new THREE.Vector2(25,0),
            new THREE.Vector2(50,-60)
        ];
        // SplineCurve：二维样条曲线
        var splineCurve =  new THREE.SplineCurve(points);
        //分段数50，返回51个顶点
        var splinePoints = splineCurve.getPoints(50);
        var geometry = new THREE.LatheGeometry(splinePoints,100);
        var material=new THREE.MeshPhongMaterial({
            color:0xff00ff,//三角面颜色
            side:THREE.DoubleSide//两面可见
        });//材质对象
        material.wireframe = true;//线条模式渲染(查看细分数)
        var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
        scene.add(mesh);//旋转网格模型添加到场景中


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

export { RotateMakeModel }
