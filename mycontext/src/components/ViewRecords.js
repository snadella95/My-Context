import React, { Component } from 'react';
import {
    FormControl, Select, OutlinedInput, Card, CardContent, Typography, MenuItem, LinearProgress, CardHeader, Button
    , Divider
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import api from '../api/blockChainService';
class ViewRecords extends Component {
    state = {}

    constructor(props) {
        super(props);
        this.state = {
            records: [],
            record: '',
            patientRecord: [],
            loaded: false,
            recordsExist: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleViewRecords = this.handleViewRecords.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleViewRecords() {
        api.doctor_patientrecord_get(this.state.record)
            .then(response => {
                console.log(JSON.stringify(response));
                this.setState({ patientRecord: response });
                this.setState({ loaded: true });
            })
            .catch(err => {
                console.log(JSON.stringify(err));
            })
    }

    componentDidMount() {
        // this.setState({ loaded: false });
        if (sessionStorage.getItem('jwt')) {
            api.doctor_records_get(this.props.email)
                .then((response) => {
                    this.setState({ records: response })
                    this.setState({ loaded: true });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            this.setState({ redirect: true });
        }
    }

    render() {

        if (this.state.redirect) {
            return (
                <Redirect to='/' />
            )
        };
        if (!this.state.loaded) {
            return (
                <LinearProgress style={{ "align": "center" }} />
            )
        }
        let menuItems = {}

        if (this.state.loaded) {
            menuItems =
                this.state.records.map((record, index) => {
                    return (
                        <MenuItem key={index} value={record.Owner} style={{ "fontSize": "13px" }}>{record.Owner}</MenuItem>
                    )
                });
        }

        return (
            <div style={{ "display": "inline" }}>
                <Card>
                    <CardContent>
                        <Typography>Names of patients whose records you have access to, appear on the dropdown</Typography>
                    </CardContent>
                </Card>
                <Card style={{ "padding": "10px", "width": "30%", "alignContent": "center", "marginTop": "10px", "marginBottom": "10px" }}>
                    <FormControl variant="outlined" style={{ "width": "100%" }}>
                        <Select
                            value={this.state.record}
                            onChange={this.handleInputChange}
                            variant="filled"
                            input={
                                <OutlinedInput
                                    name="record"
                                    id="select-transaction"
                                />
                            }>
                            {menuItems}
                        </Select>
                    </FormControl>
                    <Button onClick={this.handleViewRecords}>
                        ViewRecords
                </Button>
                </Card>
                {this.state.patientRecord && this.state.patientRecord.length > 0 &&
                    (<div>
                        <Card>
                            <Typography style={{ "margin": "10px", "padding": "10px" }}> <span style={{ "color": "#3880ff" }}>PATIENT VITALS</span>
                                <Typography> <span style={{ "color": "#3880ff" }}>GENERAL APPEARANCE : </span>{this.state.patientRecord[0].vitals.GeneralAppearance ? this.state.patientRecord[0].vitals.GeneralAppearance : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>HEIGHT : </span>{this.state.patientRecord[0].vitals.Height ? this.state.patientRecord[0].vitals.Height : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>WEIGHT : </span>{this.state.patientRecord[0].vitals.Weight ? this.state.patientRecord[0].vitals.Weight : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>TEMPERATURE : </span>{this.state.patientRecord[0].vitals.Temperature ? this.state.patientRecord[0].vitals.Temperature : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>RYTHM : </span>{this.state.patientRecord[0].vitals.Rythm ? this.state.patientRecord[0].vitals.Rythm : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>Blood Pressure : </span>{this.state.patientRecord[0].vitals.BP ? this.state.patientRecord[0].vitals.BP : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>Eyes : </span>{this.state.patientRecord[0].vitals.Eyes ? this.state.patientRecord[0].vitals.Eyes : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>EAR/NOSE/THROAT : </span>{this.state.patientRecord[0].vitals.EarNoseThroat ? this.state.patientRecord[0].vitals.EarNoseThroat : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>CARDIO VASCULAR : </span>{this.state.patientRecord[0].vitals.CardioVascular ? this.state.patientRecord[0].vitals.CardioVascular : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>RESPIRATORY : </span>{this.state.patientRecord[0].vitals.Respiratory ? this.state.patientRecord[0].vitals.Respiratory : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>GASTROINTENSTINAL : </span>{this.state.patientRecord[0].vitals.Gastrointenstinal ? this.state.patientRecord[0].vitals.Gastrointenstinal : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>GENITOURINARY : </span>{this.state.patientRecord[0].vitals.Genitourinary ? this.state.patientRecord[0].vitals.Genitourinary : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>MUSCULOSKELETAL : </span>{this.state.patientRecord[0].vitals.MusculoSkeletal ? this.state.patientRecord[0].vitals.MusculoSkeletal : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>SKIN : </span>{this.state.patientRecord[0].vitals.Skin ? this.state.patientRecord[0].vitals.Skin : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>NEUROLOGIC : </span>{this.state.patientRecord[0].vitals.NeuroLogic ? this.state.patientRecord[0].vitals.NeuroLogic : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>PSYCHIATRIC : </span>{this.state.patientRecord[0].vitals.Psychiatric ? this.state.patientRecord[0].vitals.Psychiatric : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>ENDOCRINE : </span>{this.state.patientRecord[0].vitals.Endocrine ? this.state.patientRecord[0].vitals.Endocrine : 'N/A'}</Typography>
                                <Typography> <span style={{ "color": "#3880ff" }}>PROBLEMS SUMMARY : </span>{this.state.patientRecord[0].vitals.problemsVital ? this.state.patientRecord[0].vitals.problemsVital : 'N/A'}</Typography>
                            </Typography>
                        </Card>
                        <Divider />
                        <Card style={{ "marginTop": "10px", "padding": "10px" }}>
                            <Typography><span style={{ "color": "#3880ff" }}>PATIENT PROBLEMS</span>
                                {this.state.patientRecord[0].Problems.map((problem, index) => {
                                    return (
                                        <Typography key={index}>{problem}</Typography>
                                    )
                                })}
                            </Typography>
                        </Card>
                        <Divider />
                        <Card style={{ "marginTop": "10px", "padding": "10px" }}>
                            <Typography><span style={{ "color": "#3880ff" }}>MEDICATIONS</span>
                                {this.state.patientRecord[0].Medications.map((medication, index) => {
                                    return (
                                        <Typography key={index}>{medication}</Typography>
                                    )
                                })}
                            </Typography>
                        </Card>
                        <Divider />
                        <Card style={{ "marginTop": "10px", "padding": "10px" }}>
                            <Typography><span style={{ "color": "#3880ff" }}>ALLERGIES</span>
                                {this.state.patientRecord[0].Allergies.map((allergy, index) => {
                                    return (
                                        <Typography key={index}>{allergy}</Typography>
                                    )
                                })}
                            </Typography>
                        </Card>
                    </div >)
                }
            </div>);
    }
}

export default ViewRecords;