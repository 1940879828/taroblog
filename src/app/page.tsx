"use client"
import {TextSquare} from "@/component/TextSquare"
import React from "react"
import {Layer, Stage} from "react-konva"

export default function Home() {
  const [cards, _setCards] = React.useState([
    { text: "Card 1", x: 100, y: 100 },
    { text: "Card 2", x: 300, y: 100 }
  ])

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {cards.map((card, index) => (
          // 调用 makeTextSquare 创建每个卡片
          <React.Fragment key={index}>
            {TextSquare(card.text, { x: card.x, y: card.y })}
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  )
}
