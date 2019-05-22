import React, { Component } from 'react';
import { Card, CircularProgress, Typography, CardActionArea } from '@material-ui/core';
import api from '../../api/blockChainService';
class VitalsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vitalTransactions: []
        }
    }

    componentDidMount() {
        api.transaction_vitals_get(this.props.recordsid)
            .then(response => {
                this.setState({ vitalTransactions: response });
                console.log(JSON.stringify(response));
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }

    render() {
        if (this.state.vitalTransactions.length === 0) {
            return (
                <div>
                    <CircularProgress color="primary" />
                </div>
            )
        }
        else {
            const Records =
                this.state.vitalTransactions.map(vital => {
                    return (
                        <Card key={vital} style={{ "padding": "20px", "margin": "20px" }}>
                            <Typography style={{ "margin": "10px" }}>VITALS RECORD : {vital.GeneralAppearance}</Typography>
                            <CardActionArea>
                                <Typography style={{ "margin": "10px" }}>TIME STAMP : {vital.timestamp}</Typography>
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

export default VitalsContainer;