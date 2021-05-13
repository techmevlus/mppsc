import React from 'react';


/*export default function countdouwnTimer() {
  const [counter, setCounter] = React.useState(120);


  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div>
      <div>Countdown: {counter}</div>
    </div>
  );
}*/

//http://www.4codev.com/react/advanced-timer-countdown-react-component-days-hours-minutes-seconds-idpx1157256550973165770.html

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

  render() {
    const { days, hours, minutes, seconds, expired } = this.state;
    if (expired) {
      return <div className="expired">Expired :(</div>;
    }
    return (
      <div className="timer">
        <div>
          {days}
          <span>d</span>
        </div>
        <div>
          {hours}
          <span>h</span>
        </div>
        <div>
          {minutes}
          <span>m</span>
        </div>
        <div>
          {seconds}
          <span>s</span>
        </div>
      </div>
    );
  }
}
export default Timer;

//CSS Style for Timer. 

/* 
.timer {
  display: flex;
  font-size: 20px;
  justify-content: center;
}
.timer > div {
  padding: 10px;
  background: #444;
  color: #fff;
  font-size: 30px;
  margin-right: 2px;
  width: 100px;
  display: flex;
  justify-content: center;
}
.timer > div > span {
  text-transform: uppercase;
  color: #999;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.expired {
  font-size: 20px;
  color: rgb(126, 49, 49);
  border: 1px solid rgb(126, 49, 49);
  padding: 20px;
}
*/