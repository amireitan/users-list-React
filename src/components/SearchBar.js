import React, {Component, PropTypes} from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {text: ''};
    this.onClickSaveButton = this.onClickSaveButton.bind(this);
    this.onChangeText      = this.onChangeText.bind(this);
  }

  onChangeText(e) {
    this.setState({text: e.target.value.trim()});
    console.log(this.state);
  }

  onClickSaveButton(e) {
    e.preventDefault();
    this.setState({text: ''});
    this.props.fetchData(this.state.text);
  }

  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.onClickSaveButton}>
          <input placeholder="Search for GitHub User" 
                 onChange={this.onChangeText} 
                 value={this.state.text} type="text"/>
          <button onClick={this.onClickSaveButton}>SAVE</button>
        </form>
      </div>
    )
  }
}

SearchBar.propTypes = {
  fetchData: React.PropTypes.func.isRequired
}

export default SearchBar;