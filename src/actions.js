import { createAction } from 'redux-actions'
import { bind } from 'redux-effects'
import { fetch } from './effects/fetch'
import { parse } from './effects/parse'

import actionTypes from './action-types'

const selectResource = createAction(actionTypes.SELECT_RESOURCE)

const requestResource = createAction(actionTypes.REQUEST_RESOURCE)
const receiveResource = createAction(actionTypes.RECEIVE_RESOURCE)
const erroredResource = createAction(actionTypes.ERRORED_RESOURCE)

function fetchResource (id) {
  return [
    requestResource(id),
    bind(
      fetch(id),
      parseResource,
      erroredResource
    )
  ]
}

function parseResource (data) {
  return bind(
    parse(data),
    receiveResource,
    erroredResource
  )
}

module.exports = {
  selectResource,
  fetchResource
}
