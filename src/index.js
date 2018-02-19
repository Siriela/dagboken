import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// TODO next: 

// TODO:
// Ladda om listan efter att något raderas
class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state={posts:[]}
  }
 
  handleClick(id) {
    localStorage.removeItem(id);
  }

  render() {
    let id= this.props.id; // Hämtar id, dvs timestampen, för den post som ska raderas
    return(
      <button onClick={() => this.handleClick(id)}>Radera post</button>
    ); 
  }
}

class Postlist extends React.Component {
  constructor(props) {
    super(props);
   
  }
 
  render() {
  
    let posts= this.props.posts;
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
    this.setState({value: event.target.value});// target: det element som kallar funktionen handleChange? Dvs textarea
  }

  //När formuläret submittas körs denna. Den sparar det som nu står i textfältet till localstorage med en timestamp som key
  handleSubmit(event) {
    const time = new Date().getTime();
    localStorage.setItem(time, this.state.value);
  }

  // Här renderas själva formuläret av komponenten Form
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Meddelande:
          <textarea value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" value="Submit" />
      </form> 
    );
  }
}

class Diary extends React.Component {
  constructor(props) {
    super(props);
  }
 
  //Returnerar en array med alla posts wrappade i en ul
  getItems() {
    const items = [];
    for(let i=0;i<localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);
      items.push(<li key={key}>{item} <DeleteButton id={key}/></li>); //Jag kan varva html och variabler om jag använder {} 
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


  

