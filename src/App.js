import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import QuestionPage from './components/QuestionPage'
import ResultPage from './components/ResultPage'
import Loader from "./components/Loader";

import {getQuestions} from './actions'

const routes = [
    {
        id: 1,
        path: "/questions",
        component: QuestionPage
    },
    {
        id: 2,
        path: "/results",
        component: ResultPage
    }
];

class App extends React.Component {

    componentDidMount() {
        this.props.getQuestions()
    }

    render() {
        return (
            <div className='wrapper'>
                <Loader flag={this.props.isFetching}>
                    <Switch>
                        {routes.map(el =>
                            <Route
                                exact path={el.path}
                                key={el.id}
                                component={el.component}
                            />
                        )}
                        <Redirect exact from='/' to='/questions'/>
                    </Switch>
                </Loader>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.main.isFetching,
    }
};

const mapDispatchToProps = {
    getQuestions
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
