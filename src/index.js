import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Container, Grid, Icon } from 'semantic-ui-react';

import App from './App';
import AddUrl from './AddUrl';
import Payment from './Payment';
import Register from './Register';
import Login from './Login';

import './index.css';

class Routing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            usedId: null
        };

        this._onLogin = this._onLogin.bind(this);
    }

    _onLogin(status, userId) {
        this.setState({loggedIn: true, userId: userId});
    }

    render() {
        const AddUrlWrapper = () => {
            return <AddUrl userId={this.state.userId} />
        };

        const PaymentWrapper = () => {
            return <Payment userId={this.state.userId} />
        };

        return (
            <Router>
                <div className="App">
                    <Sidebar {...this.state} />
                    <div className="App-content-header">
                        <Container>
                            <Grid>
                                <Grid.Column textAlign="left">
                                    <h1>Marmalade</h1>
                                </Grid.Column>
                            </Grid>
                        </Container>
                    </div>
                    <div className="App-content">

                        <Route exact path="/" render={() => (
                            this.state.loggedIn ? (
                                <App userId={this.state.userId} />
                            ) : (
                                <Redirect to="/register"/>
                            )
                        )} />
                        <Route path="/add-url" userId={this.state.userId} component={AddUrlWrapper}/>
                        <Route path="/payment" userId={this.state.userId} component={PaymentWrapper}/>
                        <Route path="/register" render={() => (
                            this.state.loggedIn ? (
                                <Redirect to="/add-url"/>
                            ) : (
                                <Register onLogin={this._onLogin}/>
                            )
                        )}/>
                        <Route path="/login" render={() => (
                            this.state.loggedIn ? (
                                <Redirect to="/"/>
                            ) : (
                                <Login onLogin={this._onLogin}/>
                            )
                        )}/>
                    </div>
                </div>
            </Router>
        )
    }
};

const Sidebar = props => {
    if (!props.loggedIn) {
        return null;
    }

    return (
        <div className="App-sidebar">
            <Link to="/"><Icon name="home" size="big" /></Link>
            <Link to="/code"><Icon name="code" size="big" /></Link>
            <Link to="/add-url"><Icon name="plus square" size="big" /></Link>
        </div>
    )
};

ReactDOM.render(
  <Routing />,
  document.getElementById('root')
);
