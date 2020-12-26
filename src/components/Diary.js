import React from 'react';
import Form from './Form'
import Postlist from './Postlist'

export default class Diary extends React.Component {


  
    render() {
      return (
        <div className="diary">
          <div className="diary-form">
            <Form />
          </div>
          
           <Postlist/>
          
        </div>
      );
    }
  }