import * as THREE from "three"
import  { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
class GeometryMaterial {

    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    mesh: THREE.Mesh

    controls: any
    clock: THREE.Clock = new THREE.Clock()
    T0: Date
    constructor() {
        var scene = new THREE.Scene();

        var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        // 遍历几何体的face属性

        // var material = new THREE.PointsMaterial({
        //   color: 0x0000ff, //颜色
        //   size: 5, //点渲染尺寸
        // });
        // //点模型对象  参数：几何体  点材质
        // var point = new THREE.Points(geometry, material);
        // scene.add(point); //网格模型添加到场景中


        // // 直线基础材质对象
        // var material = new THREE.LineBasicMaterial({
        //   color: 0x0000ff
        // });
        // var line = new THREE.Line(geometry, material); //线模型对象
        // scene.add(line); //点模型添加到场景中

        // var material = new THREE.LineDashedMaterial({
        //   color: 0x0000ff,
        //   dashSize: 10,//显示线段的大小。默认为3。
        //   gapSize: 5,//间隙的大小。默认为1
        // });
        // var line = new THREE.Line(geometry, material); //线模型对象
        // //  computeLineDistances方法  计算LineDashedMaterial所需的距离数组
        // line.computeLineDistances();
        // scene.add(line);

        var material = new THREE.MeshPhongMaterial({
          color: 0xff0000,
          specular:0x444444,//高光部分的颜色
          shininess:20,//高光部分的亮度，默认30
        });
        var mesh = new THREE.Mesh(geometry, material); //模型对象
        scene.add(mesh); //网格对象添加到场景

        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        // point.position.set(0, 0, 0);

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

export {GeometryMaterial}
