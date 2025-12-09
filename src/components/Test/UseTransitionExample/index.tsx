"use client"
import React, {memo, PropsWithChildren, useState, useTransition} from 'react'
import Button from "@/components/Button";
import {products} from "@/components/Test/UseTransitionExample/data";
import SlowProduct from "@/components/Test/UseTransitionExample/components/SlowProduct";
import TabButton from "@/components/Test/UseTransitionExample/components/TabButton";

interface Props {
}

const useTransitionExample: React.FC<PropsWithChildren<Props>> = () => {
  const [activeTab, setActiveTab] = useState('home');

  const [activeTab2, setActiveTab2] = useState('home');
  const [isPending, startTransition] = useTransition();
  const switchActiveTab2 = (tab:string)=>{
    startTransition(()=>{
      setActiveTab2(tab) // mutation
    })
  }

  const [activeTab3, setActiveTab3] = useState('home');
  const switchActiveTab3 = async (tab: string) => {
    setActiveTab3(tab);
  }

  return (
    <div className="border p-1 m-1 text-white">
      <h2 className="text-2xl font-bold text-white">useTransitionExample</h2>

      <h3>没使用的useTransition情况，切换到Product时会卡顿(阻塞了UI渲染)</h3>
      <div>
        <div>
          <Button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'bg-white text-black' : ''}>Home</Button>
          <Button onClick={() => setActiveTab('product')} className={activeTab === 'product' ? 'bg-white text-black' : ''}>Product</Button>
          <Button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'bg-white text-black' : ''}>About</Button>
        </div>
        <div className="h-16 max-h-16 overflow-auto">
          {activeTab === 'home' && <div>Home Content</div>}
          {activeTab === 'product' && <Products />}
          {activeTab === 'about' && <div>About Content</div>}
        </div>
      </div>

      <h3>使用了useTransition情况，切换到Product时不会卡顿(不会阻塞其他优先级更高的任务:按钮切换)</h3>
      <p>lane，点击优先级高于加载优先级</p>
      <div>
        <div>
          <Button onClick={() => switchActiveTab2('home')} className={activeTab2 === 'home' ? 'bg-white text-black' : ''}>Home</Button>
          <Button onClick={() => switchActiveTab2('product')} className={activeTab2 === 'product' ? 'bg-white text-black' : ''}>Product</Button>
          <Button onClick={() => switchActiveTab2('about')} className={activeTab2 === 'about' ? 'bg-white text-black' : ''}>About</Button>
        </div>
        <div className="h-16 max-h-16 overflow-auto">
          {isPending && <p>Loading...</p>}
          {activeTab2 === 'home' && <div>Home Content</div>}
          {activeTab2 === 'product' && <Products />}
          {activeTab2 === 'about' && <div>About Content</div>}
        </div>
      </div>

      <h3>有按钮加载状态的</h3>
      <div>
        <div>
          <TabButton action={async () => { await switchActiveTab3('home') }} isActive={activeTab3 === 'home'}>Home</TabButton>
          <TabButton action={async () => { await switchActiveTab3('product') }} isActive={activeTab3 === 'product'}>Product</TabButton>
          <TabButton action={async () => { await switchActiveTab3('about') }} isActive={activeTab3 === 'about'}>About</TabButton>
        </div>
        <div className="h-16 max-h-16 overflow-auto">
          {activeTab3 === 'home' && <div>Home Content</div>}
          {activeTab3 === 'product' && <Products />}
          {activeTab3 === 'about' && <div>About Content</div>}
        </div>
      </div>
    </div>
  );
};

const Products = memo(()=>{
  let productsList = products.map((slowProduct)=>(
    <SlowProduct key={slowProduct.id} product={slowProduct} />
  ))
  return (
    <>
      <h1>Products page</h1>
      <ul>
        {productsList}
      </ul>
    </>
  )
})

export default useTransitionExample;