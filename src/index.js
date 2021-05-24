import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route
} from 'react-router-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import Quiz from './components/Quiz';
import AvailableTestArea from './components/AvailableTestArea';
import AvailableTestSeries from './components/AvailableTestSeries';
import AboutUs from './components/AboutUs';
import QuestionForm from './FormComponents/QuestionForm';
import QuestionAdded from './components/QuestionAdded';
import VideoLecture from './components/VideoLecture';
import OurTeam from './components/OurTeam';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import BlogSingle from './components/BlogSingle';

//Importing Admin and Public and Private Routes 
import AdminPrivateRoute from './Utils/AdminPrivateRoute';
import AdminPublicRoute from './Utils/AdminPublicRoute';
import Dashboard from './AdminSector/Dashboard';
import AdminLogin from './AdminSector/AdminLogin';

//Importing Author and Public and Private Routes 
import AuthorPrivateRoute from './Utils/AuthorPrivateRoute';
import AuthorPublicRoute from './Utils/AuthorPublicRoute';
import AuthorDashboard from './AuthorSector/AuthorDashboard';
import AuthorLogin from './AuthorSector/AuthorLogin';
import AuthorExam from './AuthorSector/AuthorExam';
import ExamName from './Common/ExamName';




const state={ addQuestion:{
                question: '', 
                option1: '', 
                option2: '',
                option3:'',
                option4:'',
                key:'',
                questionAdded:false
            },
            selectedAnswerReducer:{
                bgClass :'neutral'
            }
          };
const store = configureStore(state);
//mongo "mongodb+srv://cluster0.xt9zo.mongodb.net/mppsc_db" --username techmevlus
ReactDOM.render( 
  <Provider store={store}>
  	<Router>
  		<div> 
  			<Route exact path="/quiz.html" render={props => 
            <Quiz url='http://localhost:3001/api/questions' {...props} />
        }/>
            <Route exact path="/portfolio.html" render={props => 
            <AvailableTestArea url='http://localhost:3001/api/questions' {...props} />
        }/>
          <Route exact path="/availabletest.html" render={props => 
            <AvailableTestSeries url='http://localhost:3001/api/questions' {...props} />
        }/>
         <Route exact path="/about.html" render={props => 
            <AboutUs url='http://localhost:3001/api/questions' {...props} />
        }/>
                <Route exact path="/services.html" render={props => 
            <VideoLecture url='http://localhost:3001/api/questions' {...props} />
        }/>
         <Route exact path="/team.html" render={props => 
            <OurTeam url='http://localhost:3001/api/questions' {...props} />
        }/>
         <Route exact path="/pricing.html" render={props => 
            <Pricing url='http://localhost:3001/api/questions' {...props} />
        }/>
        <Route exact path="/contact.html" render={props => 
            <ContactUs url='http://localhost:3001/api/questions' {...props} />
        }/>
         <Route exact path="/blog-single.html" render={props => 
            <BlogSingle url='http://localhost:3001/api/questions' {...props} />
        }/>
        <Route exact path="/blog.html" render={props => 
            <Blog url='http://localhost:3001/api/questions' {...props} />
        }/>
        <Route exact path="/" render={props => 
            <Home url='http://localhost:3001/api/questions' {...props} />
        }/>
        <Route exact path="/addQuestion" render={props => 
            <QuestionForm url='http://localhost:3001/api/questions'/>
        }/>
        <Route exact path="/questionAdded" render={props => 
            <QuestionAdded />
        }/>
        <Route exact path="/author-exam" render={props => 
            <AuthorExam        {...props}   />
        }/>
        <Route exact path="/exams_name" render={props => 
            <ExamName url='http://localhost:3001/api/exams_name' {...props} />
        }/>


        <AdminPublicRoute path="/login" component={AdminLogin} />
        <AdminPrivateRoute path="/dashboard" component={Dashboard} />


        <AuthorPublicRoute path="/author-login" component={AuthorLogin} />
        <AuthorPrivateRoute path="/author-dashboard" component={AuthorDashboard}       
        />



                
  		</div>
  	</Router>
  </Provider>,
	document.getElementById('root')	
);




