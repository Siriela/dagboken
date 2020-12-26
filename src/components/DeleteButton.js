
import React from 'react';
export default class DeleteButton extends React.Component {
   
    
    handleClick(id) {
      this.deletePosts(id);
    }
    deletePosts(key) {
        localStorage.removeItem(key);
        return localStorage
    }
    render() {
      let id= this.props.id; // Hämtar id, dvs timestampen, för den post som ska raderas
      return(
        <button onClick={(event) => this.handleClick(id)}>Radera nu</button>
      ); 
    }
}