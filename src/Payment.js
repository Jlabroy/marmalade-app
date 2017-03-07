import React, { Component } from 'react';
import { Button, Container, Form, Grid, Input } from 'semantic-ui-react';

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Add Payment Method</h2>
                </div>
                <Container>
                    <Grid textAlign="center">
                        <Grid.Column computer={8} textAlign="left">
                            <Form>
                                <Form.Field>
                                    <label>Card Number</label>
                                    <Input placeholder="xxxx xxxx xxxx xxxx" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Expiry Date</label>
                                    <Input placeholder="mm / yy" />
                                </Form.Field>
                                <Form.Field>
                                    <label>CVC</label>
                                    <Input placeholder="xxx" />
                                </Form.Field>
                                <Form.Field>
                                    <Button primary>Create Subscription</Button>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>

        )
    }
}

export default Payment;
