import * as THREE from "three"
import  { OrbitControls, MapControls } from "./../../node_modules/three/examples/jsm/controls/OrbitControls";
class VectorTest {

    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    mesh: THREE.Mesh

    controls: any
    clock: THREE.Clock = new THREE.Clock()
    T0: Date
    constructor() {
        var scene = new THREE.Scene();

        var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
        //类型数组创建顶点数据
        var vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        50, 0, 0, //顶点2坐标
        0, 100, 0, //顶点3坐标
        0, 0, 10, //顶点4坐标
        0, 0, 100, //顶点5坐标
        50, 0, 10, //顶点6坐标
        ]);
        // 创建属性缓冲区对象
        var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
        // 设置几何体attributes属性的位置属性
        geometry.attributes.position = attribue;
        // var material = new THREE.MeshBasicMaterial({
        //     color: 0x0000ff, //三角面颜色
        //     side: THREE.DoubleSide //两面可见
        //   });
        // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // scene.add(mesh);

          // 点渲染模式
        // var material = new THREE.PointsMaterial({
        //     color: 0xff0000,
        //     size: 10.0 //点对象像素尺寸
        // }); //材质对象
        // var points = new THREE.Points(geometry, material); //点模型对象
        // scene.add(points); //点对象添加到场景中

        // 线条渲染模式
        var material=new THREE.LineBasicMaterial({
            color:0xff0000 //线条颜色
        });//材质对象
        var line=new THREE.Line(geometry,material);//线条模型对象
        scene.add(line);//线条对象添加到场景中

        // var geometry2 = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        // var material = new THREE.MeshLambertMaterial({
        // color: 0x0000ff
        // }); //材质对象Material
        // var mesh = new THREE.Mesh(geometry2, material); //网格模型对象Mesh
        // scene.add(mesh);//线条对象添加到场景中






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

export { VectorTest }
