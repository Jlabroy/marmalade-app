import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Grid, Input, Message } from 'semantic-ui-react';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            email: '',
            password: '',
            error: '',
        };
    }

    _onSetFirstName(firstName) {
        this.setState({'firstName': firstName});
    }

    _onSetEmail(email) {
        this.setState({'email': email});
    }

    _onSetPassword(password) {
        this.setState({'password': password});
    }

    _onRegister(firstName, email, password) {
        fetch('http://localhost:8000/app_dev.php/user?first_name='
            + encodeURIComponent(firstName)
            + '&password=' + encodeURIComponent(password)
            + '&email=' + encodeURIComponent(email), {
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
        const register = e => {
            e.preventDefault();
            this._onRegister(this.state.firstName, this.state.email, this.state.password);
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
                            <Form onSubmit={register}>
                                <Form.Field>
                                    <label>First Name</label>
                                    <Input
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        onChange={e => {this._onSetFirstName((e.target.value))}}
                                    />
                                </Form.Field>
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
                                <Button primary>Register</Button>
                            </Form>
                        </Grid.Column>
                        <Grid.Column computer={16} textAlign="center">
                            Already registered? 
                        </Grid.Column>
                    </Grid>
                </Container>
        )
    }
}

export default Register;
