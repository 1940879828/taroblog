import Button from "@/components/Button";
import React, {useEffect, useEffectEvent, useState} from "react";
import {setInterval} from "node:timers";

const Index = () => {
  const [count,setCount] = useState(0);

  const onTick = useEffectEvent(()=>{
    console.log('count:',count)
  })

  useEffect(()=>{
    console.log('副作用执行')

    const id = setInterval(()=>{
      onTick()
    },1000)

    return () => {
      console.log('清理函数执行了')
      clearInterval(id)
    }
  },[])

  return (
    <div className="border p-1 m-1 text-white">
      <h2 className="text-2xl font-bold text-white">useEffectEventExample</h2>
      <Button onClick={()=>setCount(count+1)} >
        点击我 count:{count}
      </Button>
    </div>
  );
};

export default Index;