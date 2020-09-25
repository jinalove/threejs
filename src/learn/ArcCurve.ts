import * as THREE from "three"
import  { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
class ArcCurve {

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
      
    var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

       /**
     * 创建线条模型
     */
    var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
    var p1 = new THREE.Vector3(50, 0, 500); //顶点1坐标
    var p2 = new THREE.Vector3(0, 70, 0); //顶点2坐标
    //顶点坐标添加到geometry对象
    geometry.vertices.push(p1, p2);
    //三维直线LineCurve3
    //var LineCurve = new THREE.LineCurve3(p1, p2);
    // 二维直线LineCurve
    // var LineCurve = new THREE.LineCurve(new THREE.Vector2(50, 0), new THREE.Vector2(0, 70));

    //  var pointArr = LineCurve.getPoints(200);
    //  geometry.setFromPoints(pointArr);


    var material = new THREE.LineBasicMaterial({
      color: 0xffff00,
    });//材质对象
    //线条模型对象
    var line = new THREE.Line(geometry, material);
    scene.add(line); //线条对象添加到场景中


    // //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
    // var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI, true);
    // //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
    // var points = arc.getPoints(50);//分段数50，返回51个顶点
    // // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    // geometry.setFromPoints(points);
    // // console.log(geometry.vertices);
    // // 如果几何体是BufferGeometry，setFromPoints方法改变的是.attributes.position属性
    // //console.log(geometry.attributes.position);
    // //材质对象
    // var material = new THREE.LineBasicMaterial({
    //   color: 0x000000
    // });
    // //线条模型对象
    // var line = new THREE.Line(geometry, material);
    // scene.add(line); //线条对象添加到场景中




    // // 绘制一个U型轮廓
    // var R = 80;//圆弧半径
    // var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
    // // 半圆弧的一个端点作为直线的一个端点
    // var line1 = new THREE.LineCurve(new THREE.Vector2(R, 200), new THREE.Vector2(R, 0));
    // var line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0), new THREE.Vector2(-R, 200));
    // // 创建组合曲线对象CurvePath
    // var CurvePath = new THREE.CurvePath();
    // // 把多个线条插入到CurvePath中
    // CurvePath.curves.push(line1, arc, line2);
    // //分段数200
    // var points:THREE.Vector[] = CurvePath.getPoints(200);
    // // var points2d:THREE.Vector2[] =[];
    // // for(var i = 0; i < points.length; i){
     
    // //   points2d[i].x =  (points[i] as THREE.Vector2).x;
    // //   points2d[i].y =  (points[i] as THREE.Vector2).y;
    // // }
    // // // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    //  geometry.setFromPoints(points as THREE.Vector2[]);
    // //材质对象
    // var material = new THREE.LineBasicMaterial({
    //   color: 0x000000
    // });
    // //线条模型对象
    // var line = new THREE.Line(geometry, material);
    //scene.add(line); //线条对象添加到场景中




       /**
     * 创建线条模型
     */
    // var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
    // var R = 100; //圆弧半径
    // var N = 50; //分段数量
    // // 批量生成圆弧上的顶点数据
    // for (var i = 0; i < N; i++) {
    //   var angle = 2 * Math.PI / N * i;
    //   var x = R * Math.sin(angle);
    //   var y = R * Math.cos(angle);
    //   geometry.vertices.push(new THREE.Vector3(x, y, 0));
    // }
    // // 插入最后一个点，line渲染模式下，产生闭合效果
    // // geometry.vertices.push(geometry.vertices[0])
    // //材质对象
    // var material = new THREE.LineBasicMaterial({
    //   color: 0x000000
    // });
    // //线条模型对象
    // var line = new THREE.Line(geometry, material);
    // scene.add(line); //线条对象添加到场景中




    // var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
    // // 三维样条曲线  Catmull-Rom算法
    // var curve = new THREE.CatmullRomCurve3([
    //   new THREE.Vector3(-50, 20, 90),
    //   new THREE.Vector3(-10, 40, 40),
    //   new THREE.Vector3(0, 0, 0),
    //   new THREE.Vector3(60, -60, 0),
    //   new THREE.Vector3(70, 0, 80)
    // ]);
    // // var box = new THREE.BoxGeometry(100, 100, 100);
    // // var curve = new THREE.CatmullRomCurve3(box.vertices);
    // //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
    // var points = curve.getPoints(100); //分段数100，返回101个顶点
    // // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    // geometry.setFromPoints(points);
    // //材质对象
    // var material = new THREE.LineBasicMaterial({
    //   color: 0x000000
    // });
    // //线条模型对象
    // var line = new THREE.Line(geometry, material);
    // scene.add(line); //线条对象添加到场景中





    //    /**
    //  * 创建线条模型
    //  */
    // var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

    // var p1 = new THREE.Vector3(-80, 0, 0);
    // var p2 = new THREE.Vector3(-40, 100, 0);
    // var p3 = new THREE.Vector3(40, 100, 0);
    // var p4 = new THREE.Vector3(80, 0, 0);
    // // 三维三次贝赛尔曲线
    // var curve3: THREE.CubicBezierCurve3 = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
    // //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
    // var points = curve3.getPoints(100); //分段数100，返回101个顶点
    // // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    // geometry.setFromPoints(points);
    // //材质对象
    // var material = new THREE.LineBasicMaterial({
    //   color: 0x00ffff
    // });
    // //线条模型对象
    // var line = new THREE.Line(geometry, material);
    // scene.add(line); //线条对象添加到场景中

    // // 点模型
    // var geometry2 = new THREE.Geometry();
    // geometry2.vertices.push(p1, p2, p3, p4)
    // var material2 = new THREE.PointsMaterial({
    //   color: 0xff00ff,
    //   size: 10,
    // });
    // //点模型对象
    // var pointss = new THREE.Points(geometry2, material2);
    // scene.add(pointss); //点模型对象添加到场景中
    // scene.add(new THREE.Line(geometry2, material2));




       /**
     * 创建线条模型
     */
    var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

    var p1 = new THREE.Vector3(-80, 0, 0);
    var p2 = new THREE.Vector3(20, 100, 0);
    var p3 = new THREE.Vector3(80, 0, 0);
    // 三维二次贝赛尔曲线
    var curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);
    //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
    var points = curve.getPoints(100); //分段数100，返回101个顶点
    // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    geometry.setFromPoints(points);
    //材质对象
    var material = new THREE.LineBasicMaterial({
      color: 0x000000
    });
    //线条模型对象
    var line = new THREE.Line(geometry, material);
    scene.add(line); //线条对象添加到场景中

    // 点模型
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(p1, p2, p3)
    var material2 = new THREE.PointsMaterial({
      color: 0xff00ff,
      size: 10,
    });
    //点模型对象
    var pointss = new THREE.Points(geometry2, material2);
    scene.add(pointss); //点模型对象添加到场景中
    scene.add(new THREE.Line(geometry2, material2));
    




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

export {ArcCurve}