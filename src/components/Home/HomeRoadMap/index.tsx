"use client"
import {cn, isMobile} from "@/lib/utils";
import {AnimatedGridPattern} from "@/components/AnimatedGridPattern";
import RoadMap from "@/components/RoadMap";
import React, {useState} from "react";
import {useTheme} from "next-themes";
import {map, backendMap} from "@/config/roadMap";

type Tab = "frontend" | "backend"

const Index = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<Tab>("frontend")
  const currentMap = activeTab === "frontend" ? map : backendMap

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
      <div className="flex justify-center pt-4 pb-2 relative z-10">
        <div role="tablist" className="tabs tabs-boxed">
          <a
            role="tab"
            className={`tab${activeTab === "frontend" ? " tab-active" : ""}`}
            onClick={() => setActiveTab("frontend")}
          >
            前端
          </a>
          <a
            role="tab"
            className={`tab${activeTab === "backend" ? " tab-active" : ""}`}
            onClick={() => setActiveTab("backend")}
          >
            后端
          </a>
        </div>
      </div>
      <RoadMap map={currentMap} />
    </div>
  );
};

export default Index;