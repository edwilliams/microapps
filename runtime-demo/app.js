window.renderApp = str => {
  const el = document.getElementById(str)
  el.innerHTML = `
  <div>
    <p>App</p>
    <a onclick="window.location.hash = '#/messages'; window.location.reload()">go to messages</a>
  </div>
  `
}
