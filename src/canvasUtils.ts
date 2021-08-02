import { Point } from './types'

// Reference http://www.java2s.com/Tutorials/HTML_CSS/HTML5_Canvas/0030__HTML5_Canvas_Line.htm
export const drawStroke = (
  context: CanvasRenderingContext2D,
  points: Point[],
  color: string
) => {
  if (!points.length) return

  context.strokeStyle = color
  context.beginPath()
  context.moveTo(points[0].x, points[0].y)

  points.forEach((point) => {
    context.lineTo(point.x, point.y)
    context.stroke()
  })

  context.closePath()
}
