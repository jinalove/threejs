
import * as THREE from "three"
import * as math from "mathjs"


export class PointUtil 
{
    /**
     * 是否是凹边形
     * @param array 
     */
    public static isConcavePolygon(array:THREE.Vector3[]): boolean 
    {
        let isConcave:boolean = false;




        return isConcave;
    }

     /**
     * 把点数组变成Vector3数组
     * @param array 
     */
    public static tranNumberArrayToVector3(array:number[]): THREE.Vector3[] 
    {
        if(array.length==0) return null;
        if(array.length % 3 == 0)
        {
            var newArray: THREE.Vector3[]  = [];
            let len:number = array.length;

            for(var i = 0; (i+2) < len; i += 3){
               let vector: THREE.Vector3 = new  THREE.Vector3(array[i],array[i+1],array[i+2]);
               newArray.push(vector);
            }
            return newArray;
        }
        return null;
    }
    

    /**
     * 
     * @param count 凸边形三角化
     */
    public static getPointIndexArray2D(count:number): Array<number>
    {
      var first:number = 0;
      var newArray = [];
      for (var i = 1; i < count;i++)
      {
          if(i+1 <= (count-1)){
            newArray.push(first);
            newArray.push(i);
            newArray.push(i+1);
          }
      }
      return newArray;
    }




    /**
     * todo:传进一系列点，排列使得这些点的顺序连接为面积最大，切不相交
     * @param array 
     */
    public static getPointArrayMaxNoConvision(array:THREE.Vector3[]): THREE.Vector3[]
    {
        
      return null;
    }

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
        public static crossProduct(valueAx:number, valueAy:number, valueAz:number, valueBx:number, valueBy:number, valueBz:number, xyzData:number[]=null):number[]
        {
            var xValue:number = ((valueAy * valueBz)) - ((valueBy * valueAz));
            var yValue:number = ((valueAz * valueBx)) - ((valueAx * valueBz));
            var zValue:number = ((valueAx * valueBy)) - ((valueBx * valueAy));
            if (xyzData)
            {
                xyzData.push(xValue, yValue, zValue);
                return xyzData;
            }
            else
            {
                return [xValue, yValue, zValue];
            }
        }


        public static crossProductVector3(v1:THREE.Vector3,v2:THREE.Vector3):number
        {
            
            let angle:number = v1.angleTo(v2);
            angle = THREE.MathUtils.radToDeg(angle);
            console.log("angle2:"+angle );
            let direction:number = math.sin(angle)>0? 1 : -1;
            console.log("direction:"+direction );
            let v3 = v1.cross(v2);
            let result:number = v3.distanceTo(new THREE.Vector3(0,0,0)) * direction;
            console.log("result:"+result );

            return result;
        }

        public static crossVector3(arr: THREE.Vector3[]):number[]
        {
            let v0:THREE.Vector3 = new THREE.Vector3().copy(arr[0]);
            let v1:THREE.Vector3 = new THREE.Vector3().copy(arr[1]);
            let v2:THREE.Vector3 = new THREE.Vector3().copy(arr[2]);

            let xl1:THREE.Vector3 = v1.sub(v0) ;
            let xl2:THREE.Vector3 = v2.sub(v1) ;
            let xl3 = xl1.cross(xl2);
                
            let v3normal = xl3.normalize();
            let v3normalafter  = new THREE.Vector3(math.abs(v3normal.x),math.abs(v3normal.y),math.abs(v3normal.z))
            let index:number = math.max(v3normalafter.x,v3normalafter.y,v3normalafter.z);

            let len:number = arr.length;
            let indexZhou:string = "x";
            let indexMaxCount:number = 0;
            if(index == v3normalafter.x)
            {
                //投影到yz方向
                for(let i = 0; i < len; i++)
                {
                    arr[i].x = 0;
                }
                indexZhou = "x";

            }
            else if(index == v3normalafter.y)
            {
                //投影到yz方向
                for(let i = 0; i < len; i++)
                {
                    arr[i].y = 0;
                }
                indexZhou = "y";
            }
            else if(index == v3normalafter.z){
                //投影到xy方向
                let maxX:number = Number.MIN_VALUE;
                for(let i = 0; i < len; i++)
                {
                    if(arr[i].x > maxX){
                        maxX = arr[i].x;
                        indexMaxCount = i;
                    }
                    arr[i].z = 0;
                }
                console.log("maxX:"+maxX);
                indexZhou = "z";
            }

            let arrayVector:THREE.Vector3[] = [];
            for(let i = 1; i < len; i++)
            {
                let vector:THREE.Vector3 = arr[i].sub(arr[i-1]);
                arrayVector.push(vector);
            }



            let Vectorlen:number = arrayVector.length;
            let sum:number = 0;
            let arrayIndex:number[] =  [];

            let vector0:THREE.Vector3 = arrayVector[indexMaxCount-1];
            let vector1:THREE.Vector3 = arrayVector[indexMaxCount];
           

            if(index == v3normalafter.x)
            {
                //投影到yz方向
                for(let i = 1; i < Vectorlen; i++)
                {
                    let vector0:THREE.Vector3 = arrayVector[i-1];
                    let vector1:THREE.Vector3 = arrayVector[i];
                    let temp:number = PointUtil.crossProduct2d_YZ(vector0, vector1);
                    sum += temp;
                    if(sum <= 0){
                        console.log("_YZ:"+i);
                    }
                }
            }
            else if(index == v3normalafter.y)
            {
             
                for(let i = 1; i < Vectorlen; i++)
                {
                    let vector0:THREE.Vector3 = arrayVector[i-1];
                    let vector1:THREE.Vector3 = arrayVector[i];
                    let temp:number = PointUtil.crossProduct2d_XZ(vector0, vector1);
                    sum += temp;
                    if(sum <= 0){
                        console.log("_XZ:"+i);
                    }
                }
            }
            else if(index == v3normalafter.z)
            {
                let direction:number = PointUtil.crossProduct2d_XY(vector0, vector1);
                console.log("direction:"+direction);
                let value:number = direction/math.abs(direction);

                for(let i = 1; i < Vectorlen; i++)
                {
                    let vector0:THREE.Vector3 = arrayVector[i-1];
                    let vector1:THREE.Vector3 = arrayVector[i];
                    let temp:number = PointUtil.crossProduct2d_XY(vector0, vector1);
                    let value2:number = temp/math.abs(temp);
                    if(value!=value2 && value2!=0){
                        console.log("_XY:"+i);
                        arrayIndex.push(i);
                    }
                }
            }

            return arrayIndex;
        }

      
    public static triangleCut(tran:THREE.Vector3[])
    {
        // var verticesNumer = [
        //     -100, 50, 0, //顶点0坐标
        //     -50, 0, 0, //顶点0坐标
        //     -100, -50, 0, //顶点1坐标
  
        //     100, -50, 0, //顶点2坐标
        //     50, 0, 0, //顶点0坐标
        //     100, 50, 0, //顶点3坐标
        //   ];
        //   let tran:THREE.Vector3[] = PointUtil.tranNumberArrayToVector3(verticesNumer);
  
          let aoIndexArray:number[] = PointUtil.crossVector3(tran);

 
          //1,4
          //寻找第一个可三角化的三角形， 第一个凹点和凹点+2 能组成就剔除掉中间的
          let aolen:number = aoIndexArray.length;
          for (let i = 0; i < aolen; i++){
              console.log("i:"+i +",value:"+aoIndexArray[i])
            }
          if(aolen==1)
          {
              let index0:number = aoIndexArray[0];
              let index1:number = index0 + 1;
              let index2:number = index0 + 2;
          }
          else if(aolen>=2)
          {
              //把区域切割，切割后递归执行
  
          }
          else if(aolen==0)
          {
              //直接三角化，它属于凸多边形
          }
          let index0:number = aoIndexArray[0];
          let index2:number = aoIndexArray[1];
    }


    /**
     * 叉乘标量值
     * @param pointB
     * @return
     *
     */
    public static crossProduct2d_XY(pointA:THREE.Vector3, pointB:THREE.Vector3):number
    {
        return ((pointA.x * pointB.y)) - ((pointA.y * pointB.x));
    }

    public static crossProduct2d_XZ(pointA:THREE.Vector3, pointB:THREE.Vector3):number
    {
        return ((pointA.x * pointB.z)) - ((pointA.z * pointB.x));
    }

    public static crossProduct2d_YZ(pointA:THREE.Vector3, pointB:THREE.Vector3):number
    {
        return ((pointA.y * pointB.z)) - ((pointA.z * pointB.y));
    }
    
    /**
     * 点乘
     * @param pointA
     * @param pointB
     * @return
     *
     */
    public static dotProduct2d(pointA:THREE.Vector2, pointB:THREE.Vector2):number
    {
        return ((pointA.x * pointB.x)) + ((pointA.y * pointB.y));
    }
}

