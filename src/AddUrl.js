import React from 'react';
import {Container, Grid, Input, Table} from 'semantic-ui-react';

class AddUrl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: '',
            url: ''
        };

        this._onIndex = this._onIndex.bind(this);
        this._onInput = this._onInput.bind(this);
    }

    _onIndex() {
        this.setState({loading: true});
        fetch('/crawler/?url=' + encodeURIComponent(this.state.url) + '&userId=' + this.props.userId, {
            method: 'get'
        }).then(response => {
            if (response.statusCode > 400) {
                throw Error(response.statusText);
            }

            return response.json();
        }).then(json => {
            this.setState({loading: false});
        }).catch(err => {
            this.setState({error: 'Sorry there has been an error.'});
        });
    }

    _onInput(e) {
        this.setState({url: e.target.value});
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
                                        <Table.HeaderCell colSpan={3}>Add New Page</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Input
                                                placeholder="Website Page Url"
                                                onChange={this._onInput}
                                                action={{
                                                    secondary: true,
                                                    icon: 'add',
                                                    content: 'Add Page',
                                                    onClick: this._onIndex,
                                                    loading: this.state.loading
                                                }}
                                                style={{width: '100%'}}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>

                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default AddUrl;
