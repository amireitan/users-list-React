import React, {Component, PropTypes} from 'react';
import Followers from './Followers';

const UserPopup = ({person, deleteItem}) => {
    return (
        <div className="container__main__list__item__toggle">
          <div className="container__main__list__item__toggle__content">
            <div className="container__main__list__item__image-big_container">
              <img  className="container__main__list__item__image-big"
                    src={person.picture} 
                    alt={person.name} />
               <div className="container__main__list__item__image-big__hover" 
                    onClick={x => deleteItem(person)}></div>
            </div>
            {person.followers.length > 0 ? <h4>Followers</h4> : ''}
            <ul className="container__main__list__item__toggle__fllow__list">
              {person.followers.map(f => <Followers f={f}/>)}
            </ul>
          </div>
         </div>
    );
}

export default UserPopup;
