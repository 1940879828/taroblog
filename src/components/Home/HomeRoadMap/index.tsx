"use client"
import {cn, isMobile} from "@/lib/utils";
import {AnimatedGridPattern} from "@/components/AnimatedGridPattern";
import RoadMap from "@/components/RoadMap";
import React from "react";
import {useTheme} from "next-themes";

const Index = () => {
  const { theme } = useTheme()
  return (
    <div className="relative overflow-hidden h-full sm:overflow-auto sm:h-auto">
      <div className="absolute inset-0 z-[-2] bg-base-100" />
      {theme !== "dark" && !isMobile() && (
        <AnimatedGridPattern
          y={100}
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "skew-y-12 z-[-1] fixed left-0 top-[65px]"
          )}
        />
      )}
      <RoadMap />
    </div>
  );
};

export default Index;