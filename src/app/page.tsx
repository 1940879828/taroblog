"use client"
import React, {useEffect} from "react"
import Konva from "konva";
import {canvasWidth, drawLine, makeTextRect} from "@/lib/drawRoadmap";

export default function Home() {
  const map = [
    {
      y: 20,
      width: 100,
      height: 50,
      fill: 'green',
      link: '/jump',
      text: "title"
    },
    {
      y: 120,
      width: 100,
      height: 50,
      fill: 'orange',
      link: '/jump',
      text: "title"
    },
    {
      y: 220,
      width: 100,
      height: 50,
      fill: 'orange',
      link: '/jump',
      text: "title"
    },
    {
      y: 320,
      width: 100,
      height: 50,
      fill: 'orange',
      link: '/jump',
      text: "title"
    }
  ]

  useEffect(() => {
    let width = canvasWidth;
    let height = window.innerHeight;

    // 创建 Stage
    let stage = new Konva.Stage({
      container: 'container', // 绑定到 id 为 container 的 div
      width: width,
      height: height,
    });

    // 创建 Layer
    let layer = new Konva.Layer();

    // 画连接线
    for (let i = 0; i < map.length - 1; i++) {
      const rect1 = map[i]; // 当前矩形
      const rect2 = map[i + 1]; // 下一个矩形

      // 调用 drawLine 函数生成连接线
      const line = drawLine(rect1, rect2,i);

      // 将连接线添加到 Layer
      layer.add(line);
    }

    // 画矩形
    map.forEach(item=>{
      layer.add(makeTextRect(item))
    })

    // 在 Layer 上监听 mouseenter 和 mouseleave 事件
    layer.on('mouseenter', function (e) {
      // 如果事件目标是矩形（或其他形状），则修改光标样式
      if (e.target instanceof Konva.Rect) {
        stage.container().style.cursor = 'pointer';
      }
    });

    layer.on('mouseleave', function (e) {
      // 恢复默认光标
      stage.container().style.cursor = 'default';
    });

    layer.on('click', function (e) {
      // 获取点击的目标形状
      const target = e.target;

      // 判断目标形状是否有 link 属性
      if (target.getAttr('link')) {
        // 跳转到 link 属性指定的链接
        window.location.href = target.getAttr('link');
      }
    });

    // 将 Layer 添加到 Stage
    stage.add(layer);
  }, []);
  return (
    <div id="container"></div>
  )
}
