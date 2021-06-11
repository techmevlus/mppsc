import React from 'react';
import Options from '../components/Options';
import { Link } from 'react-router-dom';
import Quiz from '../components/Quiz';
import Test from '../Common/Test';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.countDownId = null;
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false
    };
  }

  componentDidMount() {
    this.countDownId = setInterval(this.timerInit, 1000);
  }

  componentWillUnmount() {
    if (this.countDownId) {
      clearInterval(this.countDownId);
    }
  }

  timerInit = () => {
    const { startDate } = this.props;
    console.log(startDate);
    const now = new Date().getTime();
    if (!startDate) {
      this.setState({ expired: true });
      return;
    } 
    const countDownStartDate = new Date(startDate).getTime();
    const distance = countDownStartDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // For countdown is finished
    if (distance < 0) {
      clearInterval(this.countDownId);
      this.setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true
      });
      return;
    }
    this.setState({ days, hours, minutes, seconds, expired: false });
  };

  quizCompleted = () => {
    document.getElementById("timer").style.display="none";
    document.getElementById("question").style.display="none";
    document.getElementById("testIncomplete").style.display="none";
    document.getElementById("testCompleted").style.display="block";
  }
  
  render() {
    const { days, hours, minutes, seconds, expired } = this.state;
    if (expired) {
      return <div>
          {this.quizCompleted()}
      </div>;
    }
    return (
      <div style={{fontSize:"25px"}} className="timer">

<AccessTimeIcon ></AccessTimeIcon>
          {(days!==0)?days:""}
          <span> :</span>
        
        
          {hours}
          <span>:</span>
       
        
          {minutes}
          <span>:</span>
       
        
          {seconds}
          <span></span>
       
      </div>
    );
  }
}
export default Timer;

