"use client"


import UseTransitionExample from "@/components/Test/UseTransitionExample";
import UseEffectEvent from "@/components/Test/UseEffectEvent";

export default function Test() {


  return <div className='w-screen h-screen pt-2 bg-[#1a1a1a]'>
    <UseTransitionExample />
    <UseEffectEvent/>
  </div>;
}