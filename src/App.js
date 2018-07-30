import React, { Component } from 'react';

import './App.css';

import Menu from './components/Menu'
import Shelves from './components/Shelves'
import Shelf from './components/Shelf'
import Books from './components/Books'
import Search from './components/Search'
import { getBestSellers, searchRequest, createUser, createShelf } from './adapter'

import { Switch, Route, Redirect } from 'react-router-dom'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'

import Carousel from './components/Carousel'
import BookDetails from './components/BookDetails'

class App extends Component {

  state = {
    menuStatus: false,
    bestSellers: null,
    currentBook: null,
  }

  componentDidMount() {
    getBestSellers().then(books => {
      this.setState({
        bestSellers: books.results.lists
      })
    }).then(x => console.log(this.state))
  }

  handleMenu = () => {
    console.log('hit fn');
    this.setState({menuStatus: !this.state.menuStatus}, () => console.log(this.state))
  }

  handleSearch = (input) => {
    console.log(input);
    searchRequest(input).then(data => console.log(data));
  }

  renderBook = (book) => {
    console.log('app renderBook');
    this.setState({
      currentBook: book
    }, () => console.log(this.state))
  }

  render() {
    return (
      <div className="App container">
        <nav>
          <Menu />
        </nav>

        <Switch>
          <Route exact path='/' render={props => {
            return <Redirect to='/home' />
          }} />
          <Route path='/signup' render={props => {
            return <SignUp createUser={createUser}/>
          }} />
          <Route path='/login' component={Login} />
          <Route path='/shelves' render={props => {
            return <Shelves createShelf={createShelf} />
          }} />
          <Route path='/shelf' component={Shelf} />
          <Route path='/carousel' component={Carousel} />
          <Route path='/book' render={props => {
            return <BookDetails book={this.state.currentBook} />
          }} />
          <Route path='/home' render={props => {
            return (
              <div className='home'>
                {this.state.currentBook ? <Redirect to='/book' /> : null}
                <header className="App-header">
                  <h1 className="App-title">BetterReads</h1>
                </header>
                <main>
                  <Search handleSearch={this.handleSearch} />
                  <br/><br/>
                  {this.state.bestSellers ? <Books bestSellers={this.state.bestSellers} renderBook={this.renderBook} /> : null}
                  <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                  </p>
                </main>
              </div>
            )
          }} />

        </Switch>
      </div>
    );
  }
}

export default App;
