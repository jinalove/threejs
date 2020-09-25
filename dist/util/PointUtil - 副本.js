import * as THREE from "three";
import * as math from "mathjs";
var PointUtil = /** @class */ (function () {
    function PointUtil() {
    }
    /**
     * 是否是凹边形
     * @param array
     */
    PointUtil.isConcavePolygon = function (array) {
        var isConcave = false;
        return isConcave;
    };
    /**
    * 把点数组变成Vector3数组
    * @param array
    */
    // var verticesNumer = [
    //     -100, 50, 0, //顶点0坐标
    //     -50, 0, 0, //顶点0坐标
    //     -100, -50, 0, //顶点1坐标
    //     100, -50, 0, //顶点2坐标
    //     50, 0, 0, //顶点0坐标
    //     100, 50, 0, //顶点3坐标
    //   ];
    //   let tran:THREE.Vector3[] = PointUtil.tranNumberArrayToVector3(verticesNumer);
    PointUtil.tranNumberArrayToVector3 = function (array) {
        if (array.length == 0)
            return null;
        if (array.length % 3 == 0) {
            var newArray = [];
            var len = array.length;
            for (var i = 0; (i + 2) < len; i += 3) {
                var vector = new THREE.Vector3(array[i], array[i + 1], array[i + 2]);
                //console.log("vector:"+i+",x:"+vector.x+",y:"+vector.y+",z:"+vector.z);
                newArray.push(vector);
            }
            return newArray;
        }
        return null;
    };
    /**
     *
     * @param count 凸边形三角化
     */
    PointUtil.getPointIndexArray2D = function (count) {
        var first = 0;
        var newArray = [];
        for (var i = 1; i < count; i++) {
            if (i + 1 <= (count - 1)) {
                newArray.push(first);
                newArray.push(i);
                newArray.push(i + 1);
            }
        }
        return newArray;
    };
    /**
     * todo:传进一系列点，排列使得这些点的顺序连接为面积最大，切不相交
     * @param array
     */
    PointUtil.getPointArrayMaxNoConvision = function (array) {
        return null;
    };
    /**
      *计算叉乘
      * @param valueAx  向量A,x的值
      * @param valueAy  向量A,y的值
      * @param valueAz  向量A,z的值
      * @param valueBx  向量B,x的值
      * @param valueBy  向量B,y的值
      * @param valueBz  向量B,z的值
      * @param xyzData 如果这个数组不为空，则值会写入这个数组
      * @return   返回法线向量xyz
      *
      */
    PointUtil.crossProduct = function (valueAx, valueAy, valueAz, valueBx, valueBy, valueBz, xyzData) {
        if (xyzData === void 0) { xyzData = null; }
        var xValue = ((valueAy * valueBz)) - ((valueBy * valueAz));
        var yValue = ((valueAz * valueBx)) - ((valueAx * valueBz));
        var zValue = ((valueAx * valueBy)) - ((valueBx * valueAy));
        if (xyzData) {
            xyzData.push(xValue, yValue, zValue);
            return xyzData;
        }
        else {
            return [xValue, yValue, zValue];
        }
    };
    PointUtil.crossProductVector3 = function (v1, v2) {
        var angle = v1.angleTo(v2);
        angle = THREE.MathUtils.radToDeg(angle);
        console.log("angle2:" + angle);
        var direction = math.sin(angle) > 0 ? 1 : -1;
        console.log("direction:" + direction);
        var v3 = v1.cross(v2);
        var result = v3.distanceTo(new THREE.Vector3(0, 0, 0)) * direction;
        console.log("result:" + result);
        return result;
    };
    /**
     *
     * @param arr 拿到点数组中凹点的索引的集合
     */
    PointUtil.crossVector3 = function (arr) {
        var v1 = arr[1].sub(arr[0]);
        var v2 = arr[2].sub(arr[1]);
        var v3 = v1.cross(v2);
        var v3normal = v3.normalize();
        var v3normalafter = new THREE.Vector3(math.abs(v3normal.x), math.abs(v3normal.y), math.abs(v3normal.z));
        var index = math.max(v3normalafter.x, v3normalafter.y, v3normalafter.z);
        var len = arr.length;
        var indexZhou = "x";
        var indexMaxCount = 0;
        if (index == v3normalafter.x) {
            //投影到yz方向
            for (var i = 0; i < len; i++) {
                arr[i].x = 0;
            }
            indexZhou = "x";
        }
        else if (index == v3normalafter.y) {
            //投影到yz方向
            for (var i = 0; i < len; i++) {
                arr[i].y = 0;
            }
            indexZhou = "y";
        }
        else if (index == v3normalafter.z) {
            //投影到xy方向
            var maxX = Number.MIN_VALUE;
            for (var i = 0; i < len; i++) {
                if (arr[i].x > maxX) {
                    maxX = arr[i].x;
                    indexMaxCount = i;
                }
                arr[i].z = 0;
            }
            console.log("maxX:" + maxX);
            indexZhou = "z";
        }
        var arrayVector = [];
        for (var i = 1; i < len; i++) {
            var vector = arr[i].sub(arr[i - 1]);
            arrayVector.push(vector);
        }
        var Vectorlen = arrayVector.length;
        var sum = 0;
        var arrayIndex = [];
        var vector0 = arrayVector[indexMaxCount - 1];
        var vector1 = arrayVector[indexMaxCount];
        if (index == v3normalafter.x) {
            //投影到yz方向
            for (var i = 1; i < Vectorlen; i++) {
                var vector0_1 = arrayVector[i - 1];
                var vector1_1 = arrayVector[i];
                var temp = PointUtil.crossProduct2d_YZ(vector0_1, vector1_1);
                sum += temp;
                if (sum <= 0) {
                    console.log("_YZ:" + i);
                }
            }
        }
        else if (index == v3normalafter.y) {
            for (var i = 1; i < Vectorlen; i++) {
                var vector0_2 = arrayVector[i - 1];
                var vector1_2 = arrayVector[i];
                var temp = PointUtil.crossProduct2d_XZ(vector0_2, vector1_2);
                sum += temp;
                if (sum <= 0) {
                    console.log("_XZ:" + i);
                }
            }
        }
        else if (index == v3normalafter.z) {
            var direction = PointUtil.crossProduct2d_XY(vector0, vector1);
            var value = direction / math.abs(direction);
            console.log("direction:" + value);
            for (var i = 1; i < Vectorlen; i++) {
                var vector0_3 = arrayVector[i - 1];
                var vector1_3 = arrayVector[i];
                var temp = PointUtil.crossProduct2d_XY(vector0_3, vector1_3);
                var value2 = temp / math.abs(temp);
                if (value != value2 && value2 != 0) {
                    console.log("vector0:x:" + vector0_3.x + ",y:" + vector0_3.y + ",x:" + vector0_3.z);
                    console.log("vector1:x:" + vector1_3.x + ",y:" + vector1_3.y + ",x:" + vector1_3.z);
                    console.log("direction2:" + value2 + " _XY:第" + (i - 1) + "个向量到" + (i) + "个向量,即点" + i);
                    arrayIndex.push(i);
                }
            }
        }
        return arrayIndex;
    };
    PointUtil.triangleCut = function (tran) {
        // //console.log("before:");
        var len = tran.length;
        // for(let ind = 0; ind < len; ind++){
        //   let content = tran[ind];
        //  // console.log("x:"+content.x+",y:"+content.y+",x:"+content.z);
        // }
        var sum = [];
        var totran = [];
        for (var ind = 0; ind < tran.length; ind++) {
            var content = tran[ind];
            //console.log("ind:"+ind + " ,x:"+content.x+",y:"+content.y+",x:"+content.z);
            totran.push(new THREE.Vector3().copy(tran[ind]));
        }
        for (var ind = 0; ind < totran.length; ind++) {
            var content = totran[ind];
            console.log("totranind:" + ind + " ,x:" + content.x + ",y:" + content.y + ",x:" + content.z);
        }
        // console.log("totran.length:"+totran.length);
        var aoIndexArray = PointUtil.crossVector3(totran);
        //   console.log("tranafter:");
        //   for(let k = 0; k < len; k++){
        //     let content2 = tran[k];
        //     console.log("x:"+content2.x+",y:"+content2.y+",x:"+content2.z);
        //   }
        //1,4
        //寻找第一个可三角化的三角形， 第一个凹点和凹点+2 能组成就剔除掉中间的
        var aolen = aoIndexArray.length;
        if (aolen == 1) {
            var index0 = aoIndexArray[0];
        }
        else if (aolen >= 2) {
            //把区域切割，切割后递归执行
            //0 1 2 3 4 5 6 7 8
            //  1     4     7 8
            //0145678   
            //1234
            //801
            var sumsecond = [];
            for (var i = 1; i < aolen; i++) {
                var index0 = aoIndexArray[i - 1];
                var index1 = aoIndexArray[i];
                if (index0 == (index1 - 1))
                    continue;
                var data = [];
                //凹点与下一个凹点的连线,切割多变形
                data.push(tran[index0]);
                //console.log("index0:"+i+",x:"+tran[index0].x+",y:"+tran[index0].y+",z:"+tran[index0].z);
                for (var ind = index0 + 1; ind < index1; ind++) {
                    data.push(tran[ind]);
                    //console.log("ind:"+ind+",x:"+tran[ind].x+",y:"+tran[ind].y+",z:"+tran[ind].z);
                    tran[ind] = null; //需要把切割掉的点在原来的点集里置为null
                }
                data.push(tran[index1]);
                // console.log("index1:"+i+",x:"+tran[index1].x+",y:"+tran[index1].y+",z:"+tran[index1].z);
                sumsecond.push(data);
                if (aolen > 2 && i == (aolen - 1)) {
                    //console.log("aolen>2:");
                    //最后一个凹点，需要与第一个凹点连线
                    var data_1 = [];
                    data_1.push(tran[index1]);
                    for (var ind = index1 + 1; ind < len; ind++) {
                        data_1.push(tran[ind]);
                        tran[ind] = null;
                    }
                    var firstindex = aoIndexArray[0];
                    for (var ind = 0; ind < firstindex; ind++) {
                        data_1.push(tran[ind]);
                        tran[ind] = null;
                    }
                    data_1.push(tran[firstindex]);
                    sumsecond.push(data_1);
                }
            }
            var newResult = [];
            for (var i = 0; i < len; i++) {
                if (tran[i] != null) {
                    //console.log("tran[]:"+i+",x:"+tran[i].x+",y:"+tran[i].y+",z:"+tran[i].z);
                    newResult.push(tran[i]);
                }
            }
            sumsecond.push(newResult);
            //打印
            for (var i = 0; i < sumsecond.length; i++) {
                var array = sumsecond[i];
                console.log("----------------------------------------------------------------");
                var len_1 = array.length;
                for (var k = 0; k < len_1; k++) {
                    var content = array[k];
                    if (content == null)
                        continue;
                    console.log("group:" + i + ",x:" + content.x + ",y:" + content.y + ",x:" + content.z);
                }
            }
        }
        else if (aolen == 0) {
            //直接三角化，它属于凸多边形
            sum.push(tran);
            return sum;
        }
    };
    /**
     * 叉乘标量值
     * @param pointB
     * @return
     *
     */
    PointUtil.crossProduct2d_XY = function (pointA, pointB) {
        return ((pointA.x * pointB.y)) - ((pointA.y * pointB.x));
    };
    PointUtil.crossProduct2d_XZ = function (pointA, pointB) {
        return ((pointA.x * pointB.z)) - ((pointA.z * pointB.x));
    };
    PointUtil.crossProduct2d_YZ = function (pointA, pointB) {
        return ((pointA.y * pointB.z)) - ((pointA.z * pointB.y));
    };
    /**
     * 点乘
     * @param pointA
     * @param pointB
     * @return
     *
     */
    PointUtil.dotProduct2d = function (pointA, pointB) {
        return ((pointA.x * pointB.x)) + ((pointA.y * pointB.y));
    };
    return PointUtil;
}());
export { PointUtil };
//# sourceMappingURL=PointUtil - 副本.js.map