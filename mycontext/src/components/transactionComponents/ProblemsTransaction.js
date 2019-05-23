import React, { Component } from 'react';
import { Card, LinearProgress, Typography, CardActionArea } from '@material-ui/core';
import api from '../../api/blockChainService';
class ProblemsContainer extends Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
            problems: [],
            loaded: false,
            noData: false
        }
    }

    componentDidMount() {
        api.transaction_problems_get(this.props.recordsid)
            .then(response => {
                console.log(JSON.stringify(response));
                if (response.length === 0) {
                    this.setState({ noData: true });
                }
                else {
                    this.setState({ problems: response });
                    this.setState({ loaded: true });
                }
            })
            .catch(err => {
                console.log(JSON.stringify(err));
            })
    }

    render() {
        if (!this.state.loaded) {

            return this.state.noData ? <Typography>No data to show</Typography> : <LinearProgress color="primary" />

        }
        else {

            const Records =
                this.state.problems.map(each_problem => {
                    return (
                        <Card key={each_problem} style={{ "padding": "20px", "margin": "20px" }}>
                            <Typography style={{ "margin": "10px", "color": "#7986cb" }}>PROBLEM : {each_problem.problem}</Typography>
                            <CardActionArea>
                                <Typography style={{ "margin": "10px", "color": "#4caf50" }}>TIME STAMP : {each_problem.timestamp}</Typography>
                            </CardActionArea>
                        </Card>
                    );
                })

            return (<div>
                <p>{Records}</p>
            </div>);
        }
    }
}

export default ProblemsContainer;