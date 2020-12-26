import React from 'react';
export default class SetTime extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''}; 
    }
    handleChange(event) {
      this.setState({value: event.target.value}); // Sätter state i formuläret så att jag ser vad jag har valt
      const storedData= JSON.parse(localStorage.getItem(this.props.id));
      storedData.deleteDate= event.target.value; // Värdet från datumfältet
      localStorage.setItem(this.props.id, JSON.stringify(storedData));
    }
    render() {
      return <label>Sätt datum för borttagning:<input type="date" value={this.state.value} onChange={this.handleChange.bind(this)} /></label>
    }
  }