"use client"
import React, {useRef, useEffect} from 'react';
import * as THREE from 'three';

// 在组件顶部添加类型定义
type ScrollState = {
  targetDelta: number;
  currentDelta: number;
  maxDelta: number;
  isAnimating: boolean;
  aspect: number
};

export default function History() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 将滚动状态移到useRef中保持持久性
  const scrollStateRef = useRef<ScrollState>({
    targetDelta: 0,
    currentDelta: 0,
    maxDelta: 0,
    isAnimating: false,
    aspect: 1
  });


  const initScene = () => {
    if (!containerRef.current) return
    // 创建场景
    const scene = new THREE.Scene();
    const container = containerRef.current;
    const scrollState = scrollStateRef.current; // 获取当前状态引用

    // 确保最小有效尺寸
    const getValidSize = () => ({
      width: Math.max(container.clientWidth, 1),
      height: Math.max(container.clientHeight, 1)
    });

    // 初始化尺寸
    let {width, height} = getValidSize();
    let aspect = width / height;

    // 创建正交相机
    const camera = new THREE.OrthographicCamera(0, aspect, 1, 0, 0.1, 1000);
    camera.position.set(aspect / 2, 0.5, 1);
    camera.lookAt(aspect / 2, 0.5, 0);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 创建黑色背景墙
    const createWall = (aspectRatio: number) => {
      const geometry = new THREE.PlaneGeometry(aspectRatio, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
      });
      const wall = new THREE.Mesh(geometry, material);
      wall.position.set(aspectRatio / 2, 0.5, 0);
      return wall;
    };

    let wall = createWall(aspect);
    scene.add(wall);

    // 在初始化时设置aspect
    scrollState.aspect = aspect;

    // 添加画框
    const frames: THREE.Mesh[] = []
    const numFrames = 5
    const frameWidth = 0.3
    const gap = 2
    const totalWidth = numFrames * frameWidth + (numFrames - 1) * gap;

    for (let i = 0; i < numFrames; i++) {
      const geometry = new THREE.PlaneGeometry(frameWidth, 0.5);
      const material = new THREE.MeshBasicMaterial({
        color: 0x808080,
        side: THREE.DoubleSide
      });
      const frame = new THREE.Mesh(geometry, material);
      const x = i * (frameWidth + gap) + frameWidth / 2;
      frame.position.set(x, 1, 0.1);
      scene.add(frame);
      frames.push(frame);
    }

    console.log('背景墙范围：', {
      width: aspect,
      height: 1,
      center: { x: aspect/2, y: 0.5 }
    });

    const axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);

    // 滚动控制变量
    let delta = 0
    let maxDelta = Math.max(0, totalWidth - aspect)

    // 初始化滚动范围
    scrollState.maxDelta = Math.max(0, totalWidth - aspect);

    // 滚轮事件处理
    // 修正后的滚轮事件处理
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const speed = 0.001;

      // 使用最新状态值计算
      scrollState.targetDelta += e.deltaY * speed;
      scrollState.targetDelta = Math.max(0, Math.min(scrollState.targetDelta, scrollState.maxDelta));

      if (!scrollState.isAnimating) {
        scrollState.isAnimating = true;
        animateScroll();
      }
    };

    // 修正后的动画函数
    const animateScroll = () => {
      if (!scrollState.isAnimating) return;

      const damping = 0.1;
      const diff = scrollState.targetDelta - scrollState.currentDelta;
      scrollState.currentDelta += diff * damping;

      // 使用当前aspect值
      const currentAspect = scrollState.aspect;
      camera.left = scrollState.currentDelta;
      camera.right = scrollState.currentDelta + currentAspect;
      camera.updateProjectionMatrix();
      camera.position.set(
        scrollState.currentDelta + currentAspect / 2,
        0.5,
        1
      );
      camera.lookAt(
        scrollState.currentDelta + currentAspect / 2,
        0.5,
        0
      );

      if (Math.abs(diff) > 0.001) {
        requestAnimationFrame(animateScroll);
      } else {
        scrollState.isAnimating = false;
      }
    };

    container.addEventListener('wheel', onWheel, {passive: false});

    // 处理窗口resize
    const handleResize = () => {
      const {width: newWidth, height: newHeight} = getValidSize();
      const newAspect = newWidth / newHeight;

      // 更新所有相关状态
      scrollState.aspect = newAspect;
      scrollState.maxDelta = Math.max(0, totalWidth - newAspect);
      scrollState.targetDelta = Math.min(scrollState.targetDelta, scrollState.maxDelta);

      // 更新边界限制
      maxDelta = Math.max(0, totalWidth - newAspect)
      delta = Math.min(delta, maxDelta)
      delta = Math.max(0, delta)

      // 更新相机
      camera.left = 0;
      camera.right = newAspect;
      camera.top = 1;
      camera.bottom = 0;
      camera.updateProjectionMatrix();
      camera.position.set(newAspect / 2, 0.5, 1);
      camera.lookAt(newAspect / 2, 0.5, 0);

      // 更新墙体
      scene.remove(wall);
      wall.geometry.dispose();
      wall.material.dispose();
      wall = createWall(newAspect);
      scene.add(wall);

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('wheel', onWheel);

      // 清理场景
      scene.remove(wall);
      wall.geometry.dispose();
      wall.material.dispose();

      // 清理画框
      for (const frame of frames) {
        scene.remove(frame);
        
        // 确保 material 是单个材质对象
        if (Array.isArray(frame.material)) {
          for (const mat of frame.material) {
            mat.dispose();
          }
        } else {
          frame.material.dispose();
        }

        frame.geometry.dispose();
      }

      renderer.dispose();
      container.removeChild(renderer.domElement);
    };

  }

  useEffect(() => {
      const clearScene = initScene();
      return () => clearScene?.()
  }, []);

  return <div ref={containerRef} className='w-screen h-screen'/>;
}