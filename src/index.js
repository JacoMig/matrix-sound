import React from 'react'
import ReactDOM from 'react-dom'
import Main from './Main'
import './global.scss'

class App extends React.Component {
    render(){
        return (
            <div>
               <Main />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'))