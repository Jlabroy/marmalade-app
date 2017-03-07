import React, {Component} from 'react';
import { Container, Grid, Table } from 'semantic-ui-react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentWillMount() {
        fetch('/api/?user_id=' + this.props.userId, {
            method: 'get'
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({data: json});
        })
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Table celled striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan={3}>Pages Indexed</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {[...this.state.data].map((o, i) => {
                                        return (
                                            <Table.Row key={i}>
                                                <Table.Cell>{o.url}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default App;
