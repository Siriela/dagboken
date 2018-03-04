import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// TODO next: 
// Uppdatera state när man sätter datum
// Design: sätt färger Google MD

// TODO:
// Ladda om listan efter att något raderas
function deletePosts(key) {
  localStorage.removeItem(key);
  return localStorage
}

class DeleteButton extends React.Component {
  handleClick(id) {
    localStorage.removeItem(id);
  }

  render() {
    let id= this.props.id; // Hämtar id, dvs timestampen, för den post som ska raderas
    return(
      <button onClick={() => this.handleClick(id)}>Radera nu</button>
    ); 
  }
}

class Postlist extends React.Component {
  render() {
    const posts= this.props.posts;
    return(
      <div>    
        {posts}
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Skriv'}; 
  }

  // när något ändras i formuläret, när något skrivs körs denna. Den sätter state-värdet till vad som står just nu. Utan denna syns aldrig det som skrivs i textfältet 
  handleChange(event) {
    this.setState({value: event.target.value});// target: det element som kallar funktionen handleChange? Dvs textarea. Sätter state så att texten som skrivs syns i fältet.
  }

  //När formuläret submittas körs denna. Den sparar det som nu står i textfältet till localstorage med en timestamp som key
  handleSubmit(event) {
    const time = new Date().getTime();
    let data = {
      'time' : time,
      'value' : this.state.value,
      'deleteDate' : ''};
    let dataToStore= JSON.stringify(data);
    localStorage.setItem(time, dataToStore);
  }

  // Här renderas själva formuläret av komponenten Form
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
          <textarea value={this.state.value} onChange={this.handleChange.bind(this)} />
        <input type="submit" value="Submit" />
      </form> 
    );
  }
}

class SetTime extends React.Component {
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
class Diary extends React.Component {

  //Returnerar en array med alla posts wrappade i en ul
  getItems() {
    const items = [];
    for(let i=0;i<localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = JSON.parse(localStorage.getItem(key));
      const now = new Date().getTime();
      const time = new Date(item.deleteDate).getTime();
      if ( time <= now ) {
        deletePosts(key);
      }
      else {
        items.push(<li key={key}>{item.value} Raderas den: {item.deleteDate} <DeleteButton id={key}/><SetTime id={key}/></li>); //Jag kan varva html och variabler om jag använder {}         
      }
    }
    return <ul>{items}</ul>;
  }

  render() {
    return (
      <div className="diary">
        <div className="diary-form">
          <Form />
        </div>
        <div className="diary-display-posts">
         <Postlist posts={(this.getItems())}/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Diary />,
  document.getElementById('root')
);


  

