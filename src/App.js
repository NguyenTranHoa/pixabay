import React, { Component } from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import NavBar from './components/NavBar'
import Search from './components/Search'

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          <Search />
        </div>
      </MuiThemeProvider>
    )
  }
}
