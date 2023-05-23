import { Component } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
interface StateType {
  count: number
}
interface PorpsType {
  outcount: number
}
export default class Hellow extends Component<PorpsType, StateType> {
    constructor(props: PorpsType) {
      super(props)
      this.state = {
        count: 0
      }
    }
  render() {
    const { count } = this.state
    return (
      <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={ () => this.setState(count) }>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </>
    )
  }
}
