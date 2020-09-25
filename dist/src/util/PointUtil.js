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
    PointUtil.tranNumberArrayToVector3 = function (array) {
        if (array.length == 0)
            return null;
        if (array.length % 3 == 0) {
            var newArray = [];
            var len = array.length;
            for (var i = 0; (i + 2) < len; i += 3) {
                var vector = new THREE.Vector3(array[i], array[i + 1], array[i + 2]);
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
    PointUtil.crossVector3 = function (arr) {
        var v1 = arr[1].sub(arr[0]);
        var v2 = arr[2].sub(arr[1]);
        var v3 = v1.cross(v2);
        var v3normal = v3.normalize();
        var v3normalafter = new THREE.Vector3(math.abs(v3normal.x), math.abs(v3normal.y), math.abs(v3normal.z));
        var index = math.max(v3normalafter.x, v3normalafter.y, v3normalafter.z);
        var len = arr.length;
        var indexZhou = "x";
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
            //投影到yz方向
            for (var i = 0; i < len; i++) {
                arr[i].z = 0;
            }
            indexZhou = "z";
        }
        var arrayVector = [];
        for (var i = 1; i < len; i++) {
            var vector = arr[i].sub(arr[i - 1]);
            arrayVector.push(vector);
        }
        var Vectorlen = arrayVector.length;
        var sum = 0;
        if (index == v3normalafter.x) {
            //投影到yz方向
            for (var i = 1; i < Vectorlen; i++) {
                var vector0 = arrayVector[i - 1];
                var vector1 = arrayVector[i];
                var temp = PointUtil.crossProduct2d_YZ(vector0, vector1);
                sum += temp;
                if (sum <= 0) {
                    console.log("_YZ:" + i);
                }
            }
        }
        else if (index == v3normalafter.y) {
            for (var i = 1; i < Vectorlen; i++) {
                var vector0 = arrayVector[i - 1];
                var vector1 = arrayVector[i];
                var temp = PointUtil.crossProduct2d_XZ(vector0, vector1);
                sum += temp;
                if (sum <= 0) {
                    console.log("_XZ:" + i);
                }
            }
        }
        else if (index == v3normalafter.z) {
            for (var i = 1; i < Vectorlen; i++) {
                var vector0 = arrayVector[i - 1];
                var vector1 = arrayVector[i];
                var temp = PointUtil.crossProduct2d_XY(vector0, vector1);
                sum += temp;
                if (sum <= 0) {
                    console.log("_XY:" + i);
                }
            }
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