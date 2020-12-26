import React from 'react';
export default class Form extends React.Component {
   
    state = {value: ''}; 
  
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

    handleFormReset = () => {
        this.setState({value: ''});
    }

    // Här renderas själva formuläret av komponenten Form
    render() {
      return (
        <form id="form" onReset={this.handleFormReset.bind(this)} onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="post" >Skriv inlägg</label>
            <textarea id="post" value={this.state.value} onChange={this.handleChange.bind(this)} />
            <input type="submit" value="Submit" />
            <input type="reset" value="Rensa"  />
        </form> 
      );
    }
  }