import * as THREE from "three"
import  { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
class CurvePathSlow 
{
    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    mesh: THREE.Mesh

    controls: any
    clock: THREE.Clock = new THREE.Clock()
    T0: Date
    constructor() {
        var scene = new THREE.Scene();
        
        var count = 0;
        var animationTracker:number;
          
        var curve = new THREE.CubicBezierCurve3(
                new THREE.Vector3( -5, 0, 10 ),
                new THREE.Vector3(0, 20, 0 ),
                new THREE.Vector3(0, 20, 0 ),
                new THREE.Vector3( 2, 0, -25 )
        );

        var splineGeometry = new THREE.Geometry();
        splineGeometry.vertices = curve.getPoints( 50 );
   
    
        //scheduler loop
      
    
        function drawLine() {
            var lineGeometry = new THREE.Geometry();
            var lineMaterial = new THREE.LineBasicMaterial({
                color: 0x0000ff
            });
            console.log(splineGeometry.vertices[count]);
            console.log(splineGeometry.vertices[count+1]);
            lineGeometry.vertices.push(
                    splineGeometry.vertices[count],
                    splineGeometry.vertices[count+1]
            );
    
            var line = new THREE.Line( lineGeometry, lineMaterial );
            scene.add( line );
        }

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
        function animate() {
            if(count == 50)
            {
                cancelAnimationFrame(animationTracker);
                return;
            }
    
            //add line to the scene
            drawLine();
    
            renderer.render(scene, camera);
      //      renderer.render(scene, sphereCamera);
    
            count += 1;
    //        camera.position.z -= 0.25;
    //        camera.position.y -= 0.25;
            animationTracker = requestAnimationFrame(animate);
        }
        
        render();
        animate();
  
    }
}

export { CurvePathSlow }
