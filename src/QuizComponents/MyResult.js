
import React, { Component } from 'react';
 
class MyResult extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      questionId: ["a", "b", "c"],
    };
  }
 
  render() {
    return (
      <div>
        <ul>
          {this.state.questionId.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}
 
export default MyResult;