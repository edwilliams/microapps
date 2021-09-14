import utils from './utils'
import useEventListener from '@use-it/event-listener'
import { useKeyPress } from './hooks'

window.MicroAppLibs = {
  utils,
  hooks: { useEventListener, useKeyPress }
}
