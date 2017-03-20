import React from 'react';
import {Container, Form, Grid, Input} from 'semantic-ui-react';

class Code extends React.Component {
    render() {
        return (
            <Container>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column computer={10}>
                            <p>
                                Copy & Paste this code onto your website to implement Marmalade search
                            </p>
                            <p>


                                <Form>
                                    <Form.Field>
                                        <label>Paste this into your websites header.</label>
                                        <Input value='<script type="text/javascript" src="https://s3.eu-west-2.amazonaws.com/marmalade-static/app/search.js"></script>' />
                                    </Form.Field>
                                    <Form.Field>
                                        <Input value='<script type="text/javascript" src="https://s3.eu-west-2.amazonaws.com/marmalade-static/app/search.css"></script>' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Paste this where you would like the search bar and results to appear.</label>
                                        <Input value='<div id="marmaladesearchroot"></div>' />
                                    </Form.Field>
                                </Form>
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Code;