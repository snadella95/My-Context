import React, { Component } from 'react';
import { Card, LinearProgress, Typography, CardActionArea } from '@material-ui/core';
import api from '../../api/blockChainService';
class AllergiesContainer extends Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
            allergies: [],
            loaded: false,
            noData: false
        }
    }

    componentDidMount() {
        api.transaction_allergies_get(this.props.recordsid)
            .then(response => {
                if (response.length === 0) {
                    this.setState({ noData: true });
                }
                else {
                    this.setState({ allergies: response });
                    this.setState({ loaded: true });
                }
                console.log(JSON.stringify(response));
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }

    render() {
        if (!this.state.loaded) {

            return this.state.noData ? <Typography>No data to show</Typography> : <LinearProgress color="primary" />

        }
        else {

            const Records =
                this.state.allergies.map((allergy, index) => {
                    return (
                        <Card key={index} style={{ "padding": "20px", "margin": "20px" }}>
                            <Typography style={{ "margin": "10px" }}>ALLERGY RECORD : {allergy.presentAllergies}</Typography>
                            <CardActionArea>
                                <Typography style={{ "margin": "10px" }}>TIMESTAMP : {allergy.timestamp}</Typography>
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

export default AllergiesContainer;