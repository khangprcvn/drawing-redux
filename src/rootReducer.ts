import { RootState } from './types'
import { Action } from './actions'

const initialState: RootState = {
  currentStroke: { points: [], color: '#40a9ff' },
  strokes: [],
  historyIndex: 0,
}

export const rootReducer = (
  state: RootState = initialState,
  action: Action
) => {
  switch (action.type) {
    case 'BEGIN_STROKE': {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [action.payload],
        },
      }
    }

    case 'UPDATE_STROKE': {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [...state.currentStroke.points, action.payload],
        },
      }
    }

    case 'END_STROKE': {
      if (!state.currentStroke.points.length) return state

      return {
        ...state,
        currentStroke: { ...state.currentStroke, points: [] },
        strokes: [...state.strokes, state.currentStroke],
      }
    }

    case 'RESET': {
      return initialState
    }

    default:
      return state
  }
}
