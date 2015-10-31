import { handleActions } from 'redux-actions'

const {
  SELECT_FOCUS,
  REQUEST_GRAPH,
  RECEIVE_GRAPH,
  ERRORED_GRAPH,
  RECEIVE_PREFIXES,
  RECEIVE_QUADS,
  SET_ERROR
} = require('./action-types')

const reducer = handleActions({
  SELECT_FOCUS: (state, action) => {
    return {
      ...state,
      focusId: action.payload
    }
  },
  REQUEST_GRAPH: (state, action) => {
    return {
      ...state,
      graphs: {
        ...state.graphs,
        [action.payload]: {
          error: undefined,
          content: undefined
        }
      }
    }
  },
  RECEIVE_GRAPH: (state, action) => {
    return {
      ...state,
      graphs: {
        ...state.graphs,
        [action.payload.url]: {
          error: null,
          content: action.payload.content
        }
      }
    }
  },
  ERRORED_GRAPH: (state, action) => {
    return {
      ...state,
      graphs: {
        ...state.graphs,
        [action.payload.url]: {
          error: action.payload.error,
          content: null
        }
      }
    }
  },
  RECEIVE_QUADS: (state, action) => {
    return {
      ...state,
      quads: state.quads.concat(action.payload)
    }
  },
  RECEIVE_PREFIXES: (state, action) => {
    return {
      ...state,
      prefixes: Object.assign({}, state.prefixes, action.payload),
    }
  },
  SET_ERROR: (state, action) => {
    console.error(action.payload)
    return {
      ...state,
      error: action.payload
    }
  }
})

module.exports = reducer
