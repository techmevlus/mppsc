import React from 'react';
import { Link } from 'react-router-dom';

class ExamName extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            exams: []
        }
        this.loadExamNameFromServer = this.loadExamNameFromServer.bind(this);

    }

    // loads data from server
    loadExamNameFromServer() {
        fetch(this.props.url)
            .then(res => res.json())
            .then(exams => {
                this.setState({ exams })
            })
    }

    //gets called automatically before render
    componentWillMount() {
        this.loadExamNameFromServer();
    }

    // save exam id to local storage
    savingToLocalStorage(value) {
        localStorage.setItem('_id', value);
    }


    render() {
        if (this.state.exams === "" || this.state.exams === undefined || this.state.exams === null) {
            console.log("Data fetch failed")
        } else {
            console.log("Data fetch succeeded")
        }
        return <div>
            <ul>
                {this.state.exams.map((item, index) => (
                    <Link to="/testDetails" key={index} onClick={() => this.savingToLocalStorage(item._id)}>

                        <li key={index}>{item.exam_name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    }
}
export default ExamName;