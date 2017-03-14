import React, {Component, PropTypes} from 'react';

const Followers = ({f}) => {
  return (
        <li>        
          <img  className="container__main__list__item__image-tiny"
            src={f.picture} 
            alt={f.name} /> 
          <span title={f.name}>{f.name}</span>
        </li>
      )
}

Followers.propTypes = {
	f: React.PropTypes.object.isRequired
}

export default Followers;