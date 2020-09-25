
import * as THREE from "three"
import * as math from "mathjs"
import { forEach } from "lodash";




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
    // var verticesNumer = [
    //     -100, 50, 0, //顶点0坐标
    //     -50, 0, 0, //顶点0坐标
    //     -100, -50, 0, //顶点1坐标

    //     100, -50, 0, //顶点2坐标
    //     50, 0, 0, //顶点0坐标
    //     100, 50, 0, //顶点3坐标
    //   ];
    //   let tran:THREE.Vector3[] = PointUtil.tranNumberArrayToVector3(verticesNumer);
    public static tranNumberArrayToVector3(array:number[]): THREE.Vector3[] 
    {
 
        if(array.length==0) return null;
        if(array.length % 3 == 0)
        {
            var newArray: THREE.Vector3[]  = [];
            let len:number = array.length;

            for(var i = 0; (i+2) < len; i += 3){
                let vector: THREE.Vector3 = new  THREE.Vector3(array[i],array[i+1],array[i+2]);
                //console.log("vector:"+i+",x:"+vector.x+",y:"+vector.y+",z:"+vector.z);
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

        /**
         * 
         * @param arr 拿到点数组中凹点的索引的集合
         */
        public static getAoVector3(arrOrigin: THREE.Vector3[]):number[]
        {
            if(arrOrigin.length <3 ){
                return null;
            }
            if(arrOrigin.length == 3)
            {
                let v0:THREE.Vector3 = new THREE.Vector3().copy(arrOrigin[0]);
                let v1:THREE.Vector3 = new THREE.Vector3().copy(arrOrigin[1]);
                let v2:THREE.Vector3 = new THREE.Vector3().copy(arrOrigin[2]);
                let xl122:THREE.Vector3 = v1.sub(v0) ;
                let xl233:THREE.Vector3 = v2.sub(v1) ;
                if(xl233.angleTo(xl122) != 0){
                    return [];
                }
                return null;
            }
            
            let v0:THREE.Vector3 = new THREE.Vector3().copy(arrOrigin[0]);
            let v1:THREE.Vector3 = new THREE.Vector3().copy(arrOrigin[1]);
            let v2:THREE.Vector3 = new THREE.Vector3().copy(arrOrigin[2]);

            let xl1:THREE.Vector3 = v1.sub(v0) ;
            let xl2:THREE.Vector3 = v2.sub(v1) ;
            let xl3 = xl1.cross(xl2);
                
            let v3normal = xl3.normalize();
            let v3normalafter  = new THREE.Vector3(math.abs(v3normal.x),math.abs(v3normal.y),math.abs(v3normal.z))
            let index:number = math.max(v3normalafter.x,v3normalafter.y,v3normalafter.z);
           // console.log("index:"+index+",normal.x:"+v3normalafter.x+",normal.y:"+v3normalafter.y+",normal.z:"+v3normalafter.z);


            let arr:THREE.Vector3[] = [];
            arr.push(new THREE.Vector3().copy(arrOrigin[arrOrigin.length-1]));
            for(let ind = 0; ind < arrOrigin.length; ind++){
                arr.push(new THREE.Vector3().copy(arrOrigin[ind]));
            }
            arr.push(new THREE.Vector3().copy(arrOrigin[0]));

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
                let maxX:number = Number.NEGATIVE_INFINITY;
                for(let i = 0; i < len; i++)
                {
                    //console.log("i:"+i+",arr[i].x:"+arr[i].x);
                    if(arr[i].x > maxX){
                        maxX = arr[i].x;
                        indexMaxCount = i;
                    }
                    arr[i].z = 0;
                }
                console.log("maxX:"+maxX);
                indexZhou = "z";
            }
            //indexMaxCount = indexMaxCount-1>=0?indexMaxCount-1:arr.length-2
            //indexMaxCount = indexMaxCount-1>=0?indexMaxCount-1:arr.length-2


            let arrayVector:THREE.Vector3[] = [];
     
            //  let vend:THREE.Vector3 = new THREE.Vector3().copy(arr[len-2]);
            //  let vstart:THREE.Vector3 = new THREE.Vector3().copy(arr[len-1]);
            //  arrayVector.push(vstart.sub(vend));
            for(let i = 1; i < len; i++)
            {
                let v0:THREE.Vector3 = new THREE.Vector3().copy(arr[i-1]);
                let v1:THREE.Vector3 = new THREE.Vector3().copy(arr[i]);
                let vector:THREE.Vector3 = v1.sub(v0);
                arrayVector.push(vector);
            }
            // let vstart:THREE.Vector3 = new THREE.Vector3().copy(arrOrigin[0]);
            // let vend :THREE.Vector3 = new THREE.Vector3().copy(arrOrigin[arrOrigin.length-1]);
            // console.log("vend:"+vend.x+"vend.y:"+vend.y+"vector1.z:"+vend.z);
            // console.log("vstart:"+vstart.x+"vstart.y:"+vstart.y+"vstart.z:"+vstart.z);
            // arrayVector.push(vstart.sub(vend));

            let Vectorlen:number = arrayVector.length;
           // console.log("arrayVector.length:"+Vectorlen);

            let sum:number = 0;
            let arrayIndex:number[] =  [];

            let vector1:THREE.Vector3;
            let vector0:THREE.Vector3;
           // console.log("indexMaxCount:"+indexMaxCount);

            if(indexMaxCount > 0){
                vector0 = arrayVector[indexMaxCount-1];
                vector1 = arrayVector[indexMaxCount];
            }else{
                vector0 = arrayVector[Vectorlen-2];
                vector1 = arrayVector[Vectorlen-1];
            }

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
                // console.log("vector0:"+ vector0.x+"   vector0.y:"+vector0.y+"    vector0.z:"+vector0.z);
                // console.log("vector1:"+vector1.x+"     vector1.y:"+vector1.y+"   vector1.z:"+vector1.z);
                // console.log("direction:"+direction);
                let value:number = direction/math.abs(direction);
                console.log("direction:"+value);
                for(let i = 1; i < Vectorlen; i++)
                {
                    let vector0:THREE.Vector3 = arrayVector[i-1];
                    let vector1:THREE.Vector3 = arrayVector[i];
                   // console.log("vector0:x:"+vector0.x+",y:"+vector0.y+",x:"+vector0.z);
                   // console.log("vector1:x:"+vector1.x+",y:"+vector1.y+",x:"+vector1.z);
                    let temp:number = PointUtil.crossProduct2d_XY(vector0, vector1);
                    let value2:number = temp/math.abs(temp);
                   // console.log("value2:"+value2);

                    if(value!=value2 && value2!=0){
                         //console.log("vector0:x:"+vector0.x+",y:"+vector0.y+",x:"+vector0.z);
                         //console.log("vector1:x:"+vector1.x+",y:"+vector1.y+",x:"+vector1.z);
                         let index:number = (i-1)>0?(i-1):arrOrigin.length-1;

                        console.log("directionItem:"+value2+" _XY:第"+(index-1)+"个向量到"+(index)+"个向量,即点"+(index));
                        arrayIndex.push(index);
                    }
                }
            }

            return arrayIndex;
        }

      
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

    public static triangleCut(tran:THREE.Vector3[]):any[]
    {
          console.log(" ---------------------------------------------------------------------------------triangleCut start");
          console.log("--------------数组打印");
          let len:number = tran.length;
          for(let ind = 0; ind < len; ind++){
             console.log("index:"+ind+",x:"+tran[ind].x+",y:"+tran[ind].y+",z:"+tran[ind].z);
          }
          console.log("--------------数组打印");
          let aoIndexArray:number[] = PointUtil.getAoVector3(tran);
          if(aoIndexArray == null)
          {
              console.log("数组打印end--------------");
              return null;
          }
          //把凹点直接连接起来
          let aolen:number = aoIndexArray.length;
          let sumsecond:any[] = []; 
          if(aolen==1)
          {
              let index0:number = aoIndexArray[0];
             // console.log("一个凹点---------index:"+index0);
              //把凹点放在数组的最前面，作为三角化的共同点
              let count:number = len/2;
              //count =  Number.parseInt(count.toString());
              count = math.round(count);
             // console.log("half count:"+count);

              let index1 = index0 + count;
              
              if(index1 > (count-1)){
                  //console.log("index1:"+index1);
                  //console.log("len:"+len);

                  index1 = index1%(len);
              }
              //console.log("index1:"+index1);
              let min:number = math.min(index0,index1);
              let max:number = math.max(index0,index1);
         
              let data0:THREE.Vector3[] = [];
                
              //凹点与下一个凹点的连线,切割多变形
              data0.push(tran[min]);
              for(let ind = min+1; ind < max; ind++){
                data0.push(tran[ind]);
                  tran[ind] = null;   //需要把切割掉的点在原来的点集里置为null
              }
              data0.push(tran[max]);
              sumsecond.push(data0);


              let data:THREE.Vector3[] = [];
              data.push(tran[max]);
              for(let ind = max+1; ind < len; ind++){
                  data.push(tran[ind]);
                  tran[ind] = null;
              }
              for(let ind = 0; ind < min; ind++){
                      data.push(tran[ind]);
                      tran[ind] = null;
              }
              data.push(tran[min]);
              sumsecond.push(data);
          }
          else if(aolen>=2)
          {
                for(let i = 1; i < aolen; i++)
                {
                    let index0:number = aoIndexArray[i-1];
                    let index1:number = aoIndexArray[i];
                    if(index0==(index1-1)) continue;
                    let data:THREE.Vector3[] = [];
                
                    //凹点与下一个凹点的连线,切割多变形
                    data.push(tran[index0]);
                    for(let ind = index0+1; ind < index1; ind++){
                        data.push(tran[ind]);
                        tran[ind] = null;   //需要把切割掉的点在原来的点集里置为null
                    }
                    data.push(tran[index1]);          
                    sumsecond.push(data);

                    if(aolen>2 && i ==(aolen-1)){
                        //console.log("aolen>2:");
                        //最后一个凹点，需要与第一个凹点连线
                        let data:THREE.Vector3[] = [];
                        data.push(tran[index1]);
                        for(let ind = index1+1; ind < len; ind++){
                            data.push(tran[ind]);
                            tran[ind] = null;
                        }

                        let firstindex:number = aoIndexArray[0];
                        for(let ind = 0; ind < firstindex; ind++){
                                data.push(tran[ind]);
                                tran[ind] = null;
                        }
                        data.push(tran[firstindex]);
                        sumsecond.push(data);
                    }
                }
                //push剩下的中间部分
                let newResult:THREE.Vector3[] = [];
                for (let i = 0; i < len; i++)
                {
                    if(tran[i] !=null){
                        newResult.push(tran[i]);
                    }
                }
                sumsecond.push(newResult);
            }
  
          else if(aolen==0)
          {
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

        let sum:any[] = [];
        //递归
        for(let i = 0; i < sumsecond.length; i++){
            let array = sumsecond[i];
            let item:THREE.Vector3[] = PointUtil.triangleCut(array);  //递归
            sum.push(item);
        }
        return sum;
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

