import * as THREE from "three"
import  { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
class VectorIndex {

    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    mesh: THREE.Mesh

    controls: any
    clock: THREE.Clock = new THREE.Clock()
    T0: Date
    constructor() {
        var scene = new THREE.Scene();

        var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
        //类型数组创建顶点位置position数据
        var vertices = new Float32Array([
          0, 0, 0, //顶点1坐标
          80, 0, 0, //顶点2坐标
          80, 80, 0, //顶点3坐标
          0, 80, 0, //顶点4坐标
        ]);
        // 创建属性缓冲区对象
        var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
        // 设置几何体attributes属性的位置position属性
        geometry.attributes.position = attribue
        var normals = new Float32Array([
          0, 0, 1, //顶点1法向量
          0, 0, 1, //顶点2法向量
          0, 0, 1, //顶点3法向量
          0, 0, 1, //顶点4法向量
        ]);
        // 设置几何体attributes属性的位置normal属性
        geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标

        var indexes = new Uint16Array([
            // 0对应第1个顶点位置数据、第1个顶点法向量数据
            // 1对应第2个顶点位置数据、第2个顶点法向量数据
            // 索引值3个为一组，表示一个三角形的3个顶点
            0, 1, 2,
            0, 2, 3,
          ])
          // 索引数据赋值给几何体的index属性
        geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组

        var material = new THREE.MeshMatcapMaterial({
            // 使用顶点颜色数据渲染模型，不需要再定义color属性
            vertexColors: true, //以顶点颜色为准
            side: THREE.DoubleSide //两面可见
        });
        var mesh = new THREE.Mesh(geometry, material); //模型对象
        scene.add(mesh); //网格对象添加到场景

         
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

export { VectorIndex }
