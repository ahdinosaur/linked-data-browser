import el from 'vdom-element'

import { selectResource, fetchResource } from './actions'
import UrlInput from './components/url-input'

function beforeMount (props) {
  return fetchResource(props.resourceId)
}

function beforeUpdate (prevProps, nextProps) {
  if (prevProps.resourceId !== nextProps.resourceId) {
    return fetchResource(nextProps.resourceId)
  }
}

function render (props) {
  const { resourceId, resource, loading, error } = props

  return (
    <div>
      <UrlInput
        key="resourceId"
        value={resourceId}
        label="@id"
        onChange={selectResource}
      />
      { error ? (
        <div>error!</div>
      ) : loading ? (
        <div>loading...</div>
      ) : (
        <code><pre>
          { resource ? resource.toString() : '' }
        </pre></code>
      )}
    </div>
  )
}

module.exports = {
  beforeMount,
  beforeUpdate,
  render
}
