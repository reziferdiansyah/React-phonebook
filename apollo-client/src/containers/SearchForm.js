import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postPhone,searchPhones } from '../actions'

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: "",
            PhoneNumber: ""
        }

        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

    }

    handlePhoneNumberChange(event) {
        
        this.setState({ PhoneNumber: event.target.value });
        this.props.searchPhones(this.state.Name,event.target.value)
    }

    handleNameChange(event) {
        this.setState({ Name: event.target.value });
        this.props.searchPhones(event.target.value,this.state.PhoneNumber)

    }

    render() {
        return (

            <div className="card text-left" >
                <div className="card-header text-center font-weight-bold">
                    SEARCH CONTACT
                    </div>
                <div className="card-body">
                    <form className="form-inline justify-content-center">
                        <div className="form-group row">
                            <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Number</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={this.state.PhoneNumber} onChange={this.handlePhoneNumberChange} placeholder="Search Phone Number" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="Name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="Name" name="Name" value={this.state.Name} onChange={this.handleNameChange} placeholder="Search Name" />
                            </div>
                        </div>

                    </form>
                </div>
            </div>


        )
    }
}

const mapDispatchToProps = dispatch => ({
    postPhone: (phoneNumber, Name, id) => dispatch(postPhone(phoneNumber, Name, id)),
    searchPhones:(name,phoneNumber)=>dispatch(searchPhones(name,phoneNumber))

})

export default connect(
    null,
    mapDispatchToProps
)(SearchForm)
