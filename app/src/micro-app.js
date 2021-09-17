import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const appendScriptToHead = ({ src, scriptId }) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = scriptId
    script.crossOrigin = ''
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const MicroFrontend = ({ name, scriptName }) => {
  const history = useHistory()

  const renderMicroFrontend = () => {
    if (window[`render${name}`]) window[`render${name}`](`${name}-container`)
  }

  useEffect(() => {
    init()
  })

  const init = async () => {
    const scriptId = `micro-frontend-script-${name}`

    if (document.getElementById(scriptId)) {
      renderMicroFrontend()
      return
    }

    try {
      await appendScriptToHead({
        src: `js/microapps/${scriptName}`,
        scriptId
      })

      renderMicroFrontend()
    } catch (error) {
      history.push('/')
      document.getElementById(scriptId).remove()
    }
  }

  return <div id={`${name}-container`} data-component="microapp-container" />
}

export default MicroFrontend
