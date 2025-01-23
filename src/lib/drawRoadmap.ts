import Konva from "konva";

// 画布宽度
export const canvasWidth = window.innerWidth-15;


export const makeTextRect = (props:{
  /** 距离画布左边👈的距离 */
  x?: number
  /** 距离画布上边👆的距离 */
  y: number
  /** 宽度 */
  width: number
  /** 高度 */
  height: number
  /** 背景颜色 */
  fill: string
  /** 要跳转的路由 */
  link: string
  /** 矩形内显示的文字 */
  text: string
}) => {
  const {x,y,width,height,fill,link,text} = props
  // 计算矩形水平居中的 x 坐标
  const rectX = (canvasWidth - width) / 2;
  let rect = new Konva.Rect({
    x:x || rectX,
    y,
    width,
    height,
    fill,
    cornerRadius: 10
  });
  rect.setAttr('link', link)

  // 创建文字
  let textNode = new Konva.Text({
    x: rectX, // 文字起始位置与矩形一致
    y: y, // 文字起始位置与矩形一致
    width: width, // 文字宽度与矩形一致
    height: height, // 文字高度与矩形一致
    text: text,
    fontSize: 16, // 字体大小
    fontFamily: "Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif",
    fill: 'white', // 字体颜色
    align: 'center', // 水平居中
    verticalAlign: 'middle', // 垂直居中
    listening: false, // 禁止文字响应事件
  });

  let group = new Konva.Group();
  group.add(rect);
  group.add(textNode);

  return group
}

export const drawLine = (rect1: any, rect2: any, index: number) => {
  const minTwist = 20
  const maxTwist = 50

  // 没有x就是居中的
  // 计算矩形水平居中的 x 坐标
  const rect1X = (canvasWidth - rect1.width) / 2;
  const rect2X = (canvasWidth - rect2.width) / 2;

  // 计算连接线的起点和终点
  const startX = rect1.x || rect1X + rect1.width / 2;  // 第一个矩形的中心点 X
  const startY = rect1.y + rect1.height / 2; // 第一个矩形的中心点 Y
  const endX = rect2.x || rect2X + rect2.width / 2;    // 第二个矩形的中心点 X
  const endY = rect2.y + rect2.height / 2;   // 第二个矩形的中心点 Y

  // 计算中间控制点
  const midX = (startX + endX) / 2; // 中间点的 X 坐标
  const midY = (startY + endY) / 2; // 中间点的 Y 坐标

  // 生成在 minTwist 和 maxTwist 之间的随机扭曲幅度
  const twistOffset = minTwist + Math.random() * (maxTwist - minTwist);

  // 根据 index 的奇偶性决定扭曲方向
  const twistDirection = index % 2 === 0 ? 1 : -1; // 偶数向左，奇数向右
  const controlX = midX + twistDirection * twistOffset; // 控制点的 X 坐标

  // 创建连接线（使用贝塞尔曲线）
  const line = new Konva.Line({
    points: [startX, startY, controlX, midY, endX, endY], // 起点、控制点、终点
    stroke: 'black',                                      // 线条颜色
    strokeWidth: 2,                                       // 线条宽度
    lineCap: 'round',                                     // 线条端点样式
    lineJoin: 'round',                                    // 线条连接点样式
    tension: 0.5,                                         // 贝塞尔曲线张力
  });

  return line;
};