import * as THREE from "three"
import  { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
class Group {

    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    mesh: THREE.Mesh

    controls: any
    clock: THREE.Clock = new THREE.Clock()
    T0: Date
    constructor() {
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

    // 网格模型mesh沿着x轴方向阵列
     var group1 = new THREE.Group();
    // 共享材质和几何体数据，批量创建mesh
    for (let i = 0; i < 10; i++) {
      var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
      mesh.translateX(i * 25); // 平移该网格模型
      scene.add(mesh);//把网格模型插入到场景中
      group1.add(mesh); //把网格模型插入到组group1中
    }

    //group1沿着y轴方向阵列
    var group2 = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      var newGroup = group1.clone(); // 克隆组group1
      newGroup.translateY(i * 25); //沿着z轴平移
      scene.add(newGroup); //场景中插入组group1克隆的对象
      group2.add(newGroup); //group2中插入组group1克隆的对象
    }

    // group2沿着z轴方向阵列
    for (let i = 0; i < 10; i++) {
      var newGroup = group2.clone(); // 克隆组group2
      newGroup.translateZ(i * 25); //沿着z轴平移
      scene.add(newGroup); //场景中插入组group2的克隆对象
    }

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

    var controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
    controls.addEventListener('change', render);//监听鼠标、键盘事件
  
    }
}

export {Group}
