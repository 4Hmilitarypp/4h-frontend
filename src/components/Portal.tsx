import * as React from 'react'
import ReactDOM from 'react-dom'

// Interface to represent State
interface IState {
  el?: HTMLDivElement // div; optional
  portalRoot: HTMLElement | null // Root can be any HTML element or null
}
/* Props of this class can be any object, State is IState */
export default class Portal extends React.Component<{}, IState> {
  state = {
    el: document.createElement('div'), // create a div
    /* Root is element with id "portal" */
    portalRoot: document.getElementById('portal'),
  }
  componentDidMount = () => {
    // on mount, if both are non-null, append child to parent
    if (this.state.portalRoot && this.state.el) {
      this.state.portalRoot.appendChild(this.state.el)
    }
  }
  // on unmount, if both are non-null, remove child from parent
  componentWillUnmount = () => {
    if (this.state.portalRoot && this.state.el) {
      this.state.portalRoot.removeChild(this.state.el)
    }
  }
  render() {
    const { children } = this.props
    return this.state.el ? ReactDOM.createPortal(children, this.state.el) : null
  }
}

/* const Portal: React.FC = ({ children }) => {
  const [portalRoot, setPortalRoot] = React.useState<HTMLElement | null>(null)
  const [portal, setPortal] = React.useState<HTMLDivElement | undefined>(undefined)
  React.useEffect(() => {
    setPortalRoot(document.getElementById('portal'))
    setPortal(document.createElement('div'))
    if (portalRoot && portal) {
      portalRoot.appendChild(portal)
    }
    return () => {
      if (portalRoot && portal) {
        portalRoot.removeChild(portal)
      }
    }
  })

  return portal ? ReactDOM.createPortal(children, portal) : null
}

export default Portal */
