import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { beginStroke, updateStroke, endStroke, reset } from './actions'
import { currentStrokeSelector } from './selectors'

import { drawStroke } from './canvasUtils'

const WIDTH = 1024
const HEIGHT = 768

const App = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const dispatch = useDispatch()

  const currentStroke = useSelector(currentStrokeSelector)
  const isDrawing = !!currentStroke.points.length

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return {
      canvas,
      context: canvas?.getContext('2d'),
    }
  }

  React.useEffect(() => {
    const { canvas, context } = getCanvasWithContext()

    if (!canvas || !context) return

    requestAnimationFrame(() => {
      drawStroke(context, currentStroke.points, currentStroke.color)
    })
  }, [currentStroke])

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent
    dispatch(beginStroke(offsetX, offsetY))
  }

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const { offsetX, offsetY } = nativeEvent
    dispatch(updateStroke(offsetX, offsetY))
  }

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke())
    }
  }

  const handleClearCanvas = () => {
    const { canvas, context } = getCanvasWithContext()

    if (!canvas || !context) return

    context.clearRect(0, 0, WIDTH, HEIGHT)
    dispatch(reset())
  }

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={handleClearCanvas} />
        </div>
      </div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  )
}

export default App
