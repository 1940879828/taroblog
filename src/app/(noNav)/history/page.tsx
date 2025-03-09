"use client"
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function History() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // 创建场景
      const scene = new THREE.Scene();
      const container = containerRef.current;

      // 确保最小有效尺寸
      const getValidSize = () => ({
        width: Math.max(container.clientWidth, 1),
        height: Math.max(container.clientHeight, 1)
      });

      // 初始化尺寸
      let { width, height } = getValidSize();
      let aspect = width / height;

      // 创建正交相机
      const camera = new THREE.OrthographicCamera(0, aspect, 1, 0, 0.1, 1000);
      camera.position.set(aspect/2, 0.5, 1);
      camera.lookAt(aspect/2, 0.5, 0);

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
        wall.position.set(aspectRatio/2, 0.5, 0);
        return wall;
      };

      let wall = createWall(aspect);
      scene.add(wall);

      // 处理窗口resize
      const handleResize = () => {
        const { width: newWidth, height: newHeight } = getValidSize();
        const newAspect = newWidth / newHeight;

        // 更新相机
        camera.left = 0;
        camera.right = newAspect;
        camera.top = 1;
        camera.bottom = 0;
        camera.updateProjectionMatrix();
        camera.position.set(newAspect/2, 0.5, 1);
        camera.lookAt(newAspect/2, 0.5, 0);

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

      // 清理
      return () => {
        window.removeEventListener('resize', handleResize);
        scene.remove(wall);
        wall.geometry.dispose();
        wall.material.dispose();
        renderer.dispose();
        container.removeChild(renderer.domElement);
      };
    }
  }, []);

  return <div ref={containerRef} className='w-screen h-screen' />;
}