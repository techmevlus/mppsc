import React from 'react';
import {Link , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as questionActions from '../actions/questionActions';
class AdminLogin extends React.PureComponent {

    

    render() {
      		return <div className="container">
                        <form>
                            <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="pwd">Username :</label>
                                <div className="col-sm-10">          
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="pwd">Password</label>
                                <div className="col-sm-10">          
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="form-group">        
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" value='Post' className="btn btn-default">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>

      		}
    }
function mapStateToProps(state, ownProps){
    return {
        questionAdded: state.addQuestion.questionAdded
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(questionActions , dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminLogin);