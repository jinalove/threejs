import * as THREE from "three"
import  { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
import {PointUtil} from "./../util/PointUtil"
class VectorFangYang {

    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    mesh: THREE.Mesh

    controls: any
    clock: THREE.Clock = new THREE.Clock()
    T0: Date
    constructor() {
        var scene = new THREE.Scene();

        // var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
        // //类型数组创建顶点位置position数据
        // var vertices = new Float32Array([
        //   -50, 50, -50, //顶点0坐标
        //   -50, -50, -50, //顶点1坐标
        //   50, -50, -50, //顶点2坐标
        //   50, 50, -50, //顶点3坐标

        //   -50, 50, 500, //顶点4坐标
        //   -50, -50, 500, //顶点5坐标
        //   50, -50, 500, //顶6坐标
        //   50, 50, 500, //顶点7坐标
        // ]);
        // // 创建属性缓冲区对象
        // var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
        // // 设置几何体attributes属性的位置position属性
        // geometry.attributes.position = attribue
   
        // var indexes = new Uint16Array([
        //     0, 1, 2, 
        //     0, 2, 3, 

        //     4, 5, 6, 
        //     4, 6, 7,
            
        //     0,3,4,
        //     3,7,4,

        //     2,3,7, 
        //     2,6,7, 

        //     0,1,4, 
        //     1,3,4, 

        //     1,2,5, 
        //     2,5,6, 
        //   ])
        //   // 索引数据赋值给几何体的index属性
        // geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组

        // var material = new THREE.MeshMatcapMaterial({
        //     // 使用顶点颜色数据渲染模型，不需要再定义color属性
     
        //     side: THREE.DoubleSide, //两面可见
        //     color: 0xff0000

        // });
        // var mesh = new THREE.Mesh(geometry, material); //模型对象
        // scene.add(mesh); //网格对象添加到场景


        var verticesNumer = [
            -100, 50, 0, //顶点0坐标
            -50, 0, 0, //顶点0坐标
            -100, -50, 0, //顶点1坐标

            // -20, -50, 0, //顶点1坐标
            // -20, -20, 0, //顶点1坐标
            // 20, -5, 0, //顶点1坐标
            // 40, -40, 0, //顶点1坐标
            // 20, -50, 0, //顶点1坐标

            300, -50, 0, //顶点2坐标
            50, 0, 0, //顶点0坐标
            100, 50, 0, //顶点3坐标


            
            // 50, 0, 0, //顶点0坐标
            // -100, -50, 0, //顶点0坐标
            // -20, -50, 0, //顶点1坐标
            // -20, -20, 0, //顶点1坐标

            

        ];
        let tran:THREE.Vector3[] = PointUtil.tranNumberArrayToVector3(verticesNumer);
  
        let sum:any[] = PointUtil.triangleCut(tran);
        let count:number = sum.length;
        for (let i = 0; i < count; i++)
        {

        }


        return
        var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
        //类型数组创建顶点位置position数据
        var vertices = new Float32Array([
          -100, 50, 0, //顶点0坐标
          -50, 0, 0, //顶点0坐标
          -100, -50, 0, //顶点1坐标

          100, -50, 0, //顶点2坐标
          50, 0, 0, //顶点0坐标
          100, 50, 0, //顶点3坐标

        ]);
        let vector3Count:number = vertices.length/3;

    
        // 创建属性缓冲区对象
        var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
        // 设置几何体attributes属性的位置position属性
        geometry.attributes.position = attribue
        var indexArray:Array<number> = PointUtil.getPointIndexArray2D(vector3Count);
        // let v1 = new THREE.Vector3(100,0,0);
        // let v2 = new THREE.Vector3(-50,-50,0);
        // let result:number = PointUtil.crossProductVector3(v2,v1);

        var indexes = new Uint16Array(indexArray);
     
          // 索引数据赋值给几何体的index属性
        geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组

        var material = new THREE.MeshMatcapMaterial({
            // 使用顶点颜色数据渲染模型，不需要再定义color属性
     
            side: THREE.DoubleSide, //两面可见
            color: 0xff0000

        });
        var mesh = new THREE.Mesh(geometry, material); //模型对象
        scene.add(mesh); //网格对象添加到场景


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

        function antrige(array: number[])
        {
          var geometry = new THREE.BufferGeometry() //声明一个空几何体对象
          //类型数组创建顶点位置position数据
          var vertices = new Float32Array(array)
          // 创建属性缓冲区对象
          var attribue = new THREE.BufferAttribute(vertices, 3) //3个为一组
          // 设置几何体attributes属性的位置position属性
          geometry.attributes.position = attribue
          
          let vector3Count:number = vertices.length/3;
  
          var indexArray:Array<number> = PointUtil.getPointIndexArray2D(vector3Count);
          // let v1 = new THREE.Vector3(100,0,0);
          // let v2 = new THREE.Vector3(-50,-50,0);
          // let result:number = PointUtil.crossProductVector3(v2,v1);
  
          var indexes = new Uint16Array(indexArray);
       
            // 索引数据赋值给几何体的index属性
          geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
  
          var material = new THREE.MeshMatcapMaterial({
              // 使用顶点颜色数据渲染模型，不需要再定义color属性
       
              side: THREE.DoubleSide, //两面可见
              color: 0xff0000
  
          });
          var mesh = new THREE.Mesh(geometry, material); //模型对象
          scene.add(mesh); //网格对象添加到场景
        }
     
        render();
  
    }
}

export { VectorFangYang }
