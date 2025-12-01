"use client";
import { a, useSpring } from "@react-spring/web";
import type React from "react";
import { useEffect } from "react";

// 类型断言辅助函数，解决 react-spring 类型问题
const AnimatedDiv = a.div as React.ComponentType<{
  style: ReturnType<typeof useSpring>[0];
  children?: React.ReactNode;
}>;

const FadeInTop = ({ children }: { children: React.ReactNode }) => {
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 0,
      transform: "translateY(-100%)", // 初始位置在顶部外面
    },
    config: {
      mass: 1,
      tension: 120,
      friction: 20,
      clamp: true, // 禁止过冲
    },
  }));

  useEffect(() => {
    api.start({
      to: {
        opacity: 1,
        transform: "translateY(0)",
      },
    });
  }, [api]);

  return <AnimatedDiv style={springs}>{children}</AnimatedDiv>;
};

export default FadeInTop;
