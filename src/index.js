import React from 'react'
import ReactDOM from 'react-dom'
import Main from './Main'
import './global.scss'

class App extends React.Component {
    render(){
        return (
            <Main />
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'))