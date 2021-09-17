window.renderMessages = str => {
  const el = document.getElementById(str)
  el.innerHTML = `
  <div>
    <p>Messages</p>
    <a onclick="window.location.hash = ''; window.location.reload()">go to home</a>
  </div>
  `
}
