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
    PointUtil.getAoVector3 = function (arrOrigin) {
        if (arrOrigin.length < 3) {
            return null;
        }
        if (arrOrigin.length == 3) {
            var v0_1 = new THREE.Vector3().copy(arrOrigin[0]);
            var v1_1 = new THREE.Vector3().copy(arrOrigin[1]);
            var v2_1 = new THREE.Vector3().copy(arrOrigin[2]);
            var xl122 = v1_1.sub(v0_1);
            var xl233 = v2_1.sub(v1_1);
            if (xl233.angleTo(xl122) != 0) {
                return [];
            }
            return null;
        }
        var v0 = new THREE.Vector3().copy(arrOrigin[0]);
        var v1 = new THREE.Vector3().copy(arrOrigin[1]);
        var v2 = new THREE.Vector3().copy(arrOrigin[2]);
        var xl1 = v1.sub(v0);
        var xl2 = v2.sub(v1);
        var xl3 = xl1.cross(xl2);
        var v3normal = xl3.normalize();
        var v3normalafter = new THREE.Vector3(math.abs(v3normal.x), math.abs(v3normal.y), math.abs(v3normal.z));
        var index = math.max(v3normalafter.x, v3normalafter.y, v3normalafter.z);
        // console.log("index:"+index+",normal.x:"+v3normalafter.x+",normal.y:"+v3normalafter.y+",normal.z:"+v3normalafter.z);
        var arr = [];
        arr.push(new THREE.Vector3().copy(arrOrigin[arrOrigin.length - 1]));
        for (var ind = 0; ind < arrOrigin.length; ind++) {
            arr.push(new THREE.Vector3().copy(arrOrigin[ind]));
        }
        arr.push(new THREE.Vector3().copy(arrOrigin[0]));
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
            var maxX = Number.NEGATIVE_INFINITY;
            for (var i = 0; i < len; i++) {
                //console.log("i:"+i+",arr[i].x:"+arr[i].x);
                if (arr[i].x > maxX) {
                    maxX = arr[i].x;
                    indexMaxCount = i;
                }
                arr[i].z = 0;
            }
            console.log("maxX:" + maxX);
            indexZhou = "z";
        }
        //indexMaxCount = indexMaxCount-1>=0?indexMaxCount-1:arr.length-2
        //indexMaxCount = indexMaxCount-1>=0?indexMaxCount-1:arr.length-2
        var arrayVector = [];
        //  let vend:THREE.Vector3 = new THREE.Vector3().copy(arr[len-2]);
        //  let vstart:THREE.Vector3 = new THREE.Vector3().copy(arr[len-1]);
        //  arrayVector.push(vstart.sub(vend));
        for (var i = 1; i < len; i++) {
            var v0_2 = new THREE.Vector3().copy(arr[i - 1]);
            var v1_2 = new THREE.Vector3().copy(arr[i]);
            var vector = v1_2.sub(v0_2);
            arrayVector.push(vector);
        }
        // let vstart:THREE.Vector3 = new THREE.Vector3().copy(arrOrigin[0]);
        // let vend :THREE.Vector3 = new THREE.Vector3().copy(arrOrigin[arrOrigin.length-1]);
        // console.log("vend:"+vend.x+"vend.y:"+vend.y+"vector1.z:"+vend.z);
        // console.log("vstart:"+vstart.x+"vstart.y:"+vstart.y+"vstart.z:"+vstart.z);
        // arrayVector.push(vstart.sub(vend));
        var Vectorlen = arrayVector.length;
        // console.log("arrayVector.length:"+Vectorlen);
        var sum = 0;
        var arrayIndex = [];
        var vector1;
        var vector0;
        // console.log("indexMaxCount:"+indexMaxCount);
        if (indexMaxCount > 0) {
            vector0 = arrayVector[indexMaxCount - 1];
            vector1 = arrayVector[indexMaxCount];
        }
        else {
            vector0 = arrayVector[Vectorlen - 2];
            vector1 = arrayVector[Vectorlen - 1];
        }
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
            // console.log("vector0:"+ vector0.x+"   vector0.y:"+vector0.y+"    vector0.z:"+vector0.z);
            // console.log("vector1:"+vector1.x+"     vector1.y:"+vector1.y+"   vector1.z:"+vector1.z);
            // console.log("direction:"+direction);
            var value = direction / math.abs(direction);
            console.log("direction:" + value);
            for (var i = 1; i < Vectorlen; i++) {
                var vector0_3 = arrayVector[i - 1];
                var vector1_3 = arrayVector[i];
                // console.log("vector0:x:"+vector0.x+",y:"+vector0.y+",x:"+vector0.z);
                // console.log("vector1:x:"+vector1.x+",y:"+vector1.y+",x:"+vector1.z);
                var temp = PointUtil.crossProduct2d_XY(vector0_3, vector1_3);
                var value2 = temp / math.abs(temp);
                // console.log("value2:"+value2);
                if (value != value2 && value2 != 0) {
                    //console.log("vector0:x:"+vector0.x+",y:"+vector0.y+",x:"+vector0.z);
                    //console.log("vector1:x:"+vector1.x+",y:"+vector1.y+",x:"+vector1.z);
                    var index_1 = (i - 1) > 0 ? (i - 1) : arrOrigin.length - 1;
                    console.log("directionItem:" + value2 + " _XY:第" + (index_1 - 1) + "个向量到" + (index_1) + "个向量,即点" + (index_1));
                    arrayIndex.push(index_1);
                }
            }
        }
        return arrayIndex;
    };
    /**
     *
     * @param tran    //把区域切割，切割后递归执行，变成一个个凸边形 数组集合
    //0 1 2 3 4 5 6 7
    //  1     4     7
      
    //1234
    //4567
    //701
    //147
     */
    //console.log("index0:"+i+",x:"+tran[index0].x+",y:"+tran[index0].y+",z:"+tran[index0].z);
    PointUtil.triangleCut = function (tran) {
        console.log(" ---------------------------------------------------------------------------------triangleCut start");
        console.log("--------------数组打印");
        var len = tran.length;
        for (var ind = 0; ind < len; ind++) {
            console.log("index:" + ind + ",x:" + tran[ind].x + ",y:" + tran[ind].y + ",z:" + tran[ind].z);
        }
        console.log("--------------数组打印");
        var aoIndexArray = PointUtil.getAoVector3(tran);
        if (aoIndexArray == null) {
            console.log("数组打印end--------------");
            return null;
        }
        //把凹点直接连接起来
        var aolen = aoIndexArray.length;
        var sumsecond = [];
        if (aolen == 1) {
            var index0 = aoIndexArray[0];
            // console.log("一个凹点---------index:"+index0);
            //把凹点放在数组的最前面，作为三角化的共同点
            var count = len / 2;
            //count =  Number.parseInt(count.toString());
            count = math.round(count);
            // console.log("half count:"+count);
            var index1 = index0 + count;
            if (index1 > (count - 1)) {
                //console.log("index1:"+index1);
                //console.log("len:"+len);
                index1 = index1 % (len);
            }
            //console.log("index1:"+index1);
            var min = math.min(index0, index1);
            var max = math.max(index0, index1);
            var data0 = [];
            //凹点与下一个凹点的连线,切割多变形
            data0.push(tran[min]);
            for (var ind = min + 1; ind < max; ind++) {
                data0.push(tran[ind]);
                tran[ind] = null; //需要把切割掉的点在原来的点集里置为null
            }
            data0.push(tran[max]);
            sumsecond.push(data0);
            var data = [];
            data.push(tran[max]);
            for (var ind = max + 1; ind < len; ind++) {
                data.push(tran[ind]);
                tran[ind] = null;
            }
            for (var ind = 0; ind < min; ind++) {
                data.push(tran[ind]);
                tran[ind] = null;
            }
            data.push(tran[min]);
            sumsecond.push(data);
        }
        else if (aolen >= 2) {
            for (var i = 1; i < aolen; i++) {
                var index0 = aoIndexArray[i - 1];
                var index1 = aoIndexArray[i];
                if (index0 == (index1 - 1))
                    continue;
                var data = [];
                //凹点与下一个凹点的连线,切割多变形
                data.push(tran[index0]);
                for (var ind = index0 + 1; ind < index1; ind++) {
                    data.push(tran[ind]);
                    tran[ind] = null; //需要把切割掉的点在原来的点集里置为null
                }
                data.push(tran[index1]);
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
            //push剩下的中间部分
            var newResult = [];
            for (var i = 0; i < len; i++) {
                if (tran[i] != null) {
                    newResult.push(tran[i]);
                }
            }
            sumsecond.push(newResult);
        }
        else if (aolen == 0) {
            //直接三角化，它属于凸多边形
            console.log("直接三角化，它属于凸多边形");
            return tran;
        }
        //打印
        // console.log("print start ----------------------------------------------------------------");
        // for(let i = 0; i < sumsecond.length; i++){
        //     let array = sumsecond[i];
        //     let len:number = array.length;
        //     for(let k = 0; k < len; k++){
        //         let content = array[k];
        //         if(content ==null) continue;
        //         console.log("group:"+i+",x:"+content.x+",y:"+content.y+",x:"+content.z);
        //     }
        // }
        // console.log("print end ----------------------------------------------------------------");
        var sum = [];
        //递归
        for (var i = 0; i < sumsecond.length; i++) {
            var array = sumsecond[i];
            var item = PointUtil.triangleCut(array); //递归
            sum.push(item);
        }
        return sum;
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
//# sourceMappingURL=PointUtil.js.map