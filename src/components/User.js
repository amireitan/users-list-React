import React, {Component, PropTypes} from 'react';
import UserPopup  from './UserPopup';

class User extends React.Component {
  constructor() {
    super();
    this.deleteItem  = this.deleteItem.bind(this);
  }

  deleteItem(item) {
    this.props.deleteItem(item);
  }

  openUserTab(url) {
    window.open(url, "_blank");
  }
  
  render() {
    return (
       <li className="container__main__list__item">
         <UserPopup person={this.props.person} deleteItem={this.deleteItem}/>
         <div className="container__main__list__item__image-container">
              <a onClick={this.openUserTab.bind(this, this.props.person.url)}>
                <img  className="container__main__list__item__image-small"
                      src={this.props.person.picture} 
                      alt={this.props.person.name} />
               </a>
         </div>   
       </li>);
  }
}

User.propTypes = {
  deleteItem: React.PropTypes.func.isRequired,
  person: React.PropTypes.object.isRequired
}


export default User;