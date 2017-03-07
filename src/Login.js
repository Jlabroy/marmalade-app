import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Grid, Input, Message } from 'semantic-ui-react';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
        };
    }

    _onSetEmail(email) {
        this.setState({'email': email});
    }

    _onSetPassword(password) {
        this.setState({'password': password});
    }

    _onLogin(email, password) {
        fetch('/api/session?email='
            + encodeURIComponent(email)
            + '&password=' + encodeURIComponent(password), {
            method: 'get'
        }).then(response => {
            if (response.statusCode > 400) {
                throw Error(response.statusText);
            }

            return response.json();
        }).then(json => {
            this.props.onLogin(true, json);
        }).catch(err => {
            this.setState({error: 'Sorry there has been an error.'});
        });
    }

    render() {
        const login = e => {
            e.preventDefault();
            this._onLogin(this.state.email, this.state.password);
        };

        const error = this.state.error !== '' ? (
            <Message negative>
                <Message.Header>{this.state.error}</Message.Header>
                Please try again.
            </Message>
        ) : '';

        return (
            <Container>
                <Grid textAlign="center">
                    <Grid.Column computer={8} textAlign="left">
                        {error}
                        <Form onSubmit={login}>
                            <Form.Field>
                                <label>Email</label>
                                <Input
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={e => {this._onSetEmail((e.target.value))}}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={e => {this._onSetPassword((e.target.value))}}
                                />
                            </Form.Field>
                            <Button primary>Login</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column computer={16} textAlign="center">
                        Don't have an account? <Link to="/register">Register</Link>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default Login;
