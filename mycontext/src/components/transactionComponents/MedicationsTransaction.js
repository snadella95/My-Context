import React, { Component } from 'react';
import { Card, LinearProgress, Typography, CardActionArea } from '@material-ui/core';
import api from '../../api/blockChainService';
class MedicationsContainer extends Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
            medications: [],
            loaded: false,
            noData: false
        }
    }

    componentDidMount() {
        api.transaction_medications_get(this.props.recordsid)
            .then(response => {
                if (response.length === 0) {
                    this.setState({ noData: true });
                }
                else {
                    this.setState({ medications: response });
                    this.setState({ loaded: true });
                }
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
                this.state.medications.map(medication => {
                    return (
                        <Card key={medication} style={{ "padding": "20px", "margin": "20px" }}>
                            <Typography style={{ "margin": "10px" }}>MEDICATION RECORD : {medication.presentMedications}</Typography>
                            <CardActionArea>
                                <Typography style={{ "margin": "10px" }}>TIME STAMP : {medication.timestamp}</Typography>
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

export default MedicationsContainer;