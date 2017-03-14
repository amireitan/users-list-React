import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import _ from 'lodash';
import uuid from 'uuid';
import User from './User';
import SearchBar from './SearchBar';

class App extends React.Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.fetchFollowers = this.fetchFollowers.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    
    this.state = {
      people: []
    }
  }  

  fetchFollowers(data) {
    const name = data.name;
    const url = `https://api.github.com/users/${name}/followers`;
    let followers = [];    

    return axios.get(url)
      .then(({data}) => {
        if (data.length === 0) return [];
        return _.take(data, 7).map((person) => {
          return {       
            name: person.login,
            picture: person.avatar_url,
            url: data.html_url
          }
        });
      })
      .then((list) => {
        return {
          followers: list
        };
      });
  }
  
  fetchData(name) {
    let person = {};

    const url = `https://api.github.com/users/${name}`;
    axios.get(url)
      .then(({data}) => {
        return person = {
          id: uuid.v4(),
          name: data.name,
          picture: data.avatar_url,
          url: data.html_url
        }
      })
      .then(this.fetchFollowers)
      .then((data) => {
        if (!data) return;

        person.followers = data.followers || [];
        this.state.people.push(person);
        this.setState({});
      })
      .catch((err) => { 
        if (err.response.status === 404 && person) {
          person.followers = [];
          this.state.people.push(person);
          this.setState({});
        }
      })
  }  

  deleteItem(item) {
    this.state.people = this.state.people.filter( x => x.id !== item.id);
    this.setState({})
  }

  render() {
    return (
      <div className="container">
          <SearchBar fetchData={this.fetchData}/>
          <section className="container__main">
            <ul className="container__main__list">
                {
                    this.state.people.map( p => {
                      return (
                        <User person={p} deleteItem={this.deleteItem}/>
                      )
                    })
                }
            </ul>
          </section>
      </div>
    )
  }
}

export default App;