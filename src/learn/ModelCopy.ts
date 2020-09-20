import * as THREE from "three"
import  { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
class ModelCopy {

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
        var geometry = new THREE.BoxGeometry(20, 20, 20); //创建一个立方体几何对象Geometry
        var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh); //网格模型添加到场景中
        // mesh经过系列变换
        mesh.translateX(50);
        mesh.rotateX(Math.PI / 4);
        mesh.translateZ(50);

        var geometry2 = new THREE.BoxGeometry(30, 30, 30); //创建一个立方体几何对象Geometry
        var material2 = new THREE.MeshLambertMaterial({
        color: 0xff00ff
        }); //材质对象Material
        var newMesh = new THREE.Mesh(geometry2, material2);
        // 复制mesh的位置、旋转、矩阵等属性(不包含geometry和material属性)
        newMesh.copy(mesh);
        //相比mesh而言，在平移
        newMesh.translateX(-50);
        scene.add(newMesh)

        // 坐标系辅助显示
        var axesHelper = new THREE.AxesHelper(200);
        scene.add(axesHelper);

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

export { ModelCopy }
