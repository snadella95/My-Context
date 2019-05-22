import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem } from '@material-ui/core';
import VitalsContainer from './transactionComponents/VitalsTransaction';
import ProblemsContainer from './transactionComponents/ProblemsTransaction';
import api from '../api/blockChainService';
import MedicationsContainer from './transactionComponents/MedicationsTransaction';
import AllergiesContainer from './transactionComponents/AllergiesTrasaction';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionType: 'Allergies',
            RecordsId: '',
            labelWidth: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
        if (sessionStorage.getItem('jwt')) {
            api.patient_vitals_get(this.props.email)
                .then((response) => {
                    this.setState(
                        {
                            RecordsId: response[0].RecordsId
                        })
                }).catch((err) => {
                    console.log(err);
                });
            this.setState({ disabled: true });
        }
        else {
            this.setState({ redirect: true });
        }


    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    };

    render() {
        return (<div>
            <p> TRANSACTIONS </p>
            <div style={{ "display": "inline-block" }}>
                <FormControl variant="outlined" style={{ "margin": "10px", "width": "100%", "float": "left" }}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        htmlFor="select-transaction"
                    >
                        Transaction Type</InputLabel>
                    <Select
                        value={this.state.transactionType}
                        onChange={this.handleInputChange}
                        variant="contained"
                        input={
                            <OutlinedInput
                                name="transactionType"
                                labelWidth={this.state.labelWidth}
                                id="select-transaction"
                            />
                        }>
                        {/* <Button onClick = {() => this.setState({value})} */}
                        {/* <MenuItem value="Vitals" style={{ "fontSize": "13px" }}>Vitals</MenuItem> */}
                        <MenuItem value="Problems" style={{ "fontSize": "13px" }}>Problems</MenuItem>
                        <MenuItem value="Medications" style={{ "fontSize": "13px" }}>Medications</MenuItem>
                        <MenuItem value="Allergies" style={{ "fontSize": "13px" }}>Allergies</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <br />
            <div style={{ "margin": "15px" }}>
            </div>
            {/* {this.state.transactionType === 'Vitals' && (<VitalsContainer recordsid={this.state.RecordsId} />)} */}
            {this.state.transactionType === 'Problems' && (<ProblemsContainer recordsid={this.state.RecordsId} />)}
            {this.state.transactionType === 'Medications' && (<MedicationsContainer recordsid={this.state.RecordsId} />)}
            {this.state.transactionType === 'Allergies' && (<AllergiesContainer recordsid={this.state.RecordsId} />)}
        </div>);
    }
}

export default Transactions;