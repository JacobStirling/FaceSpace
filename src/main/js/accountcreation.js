import React from 'react';

var NewAccount = React.createClass({

    getInitialState() {
        return {
            name : "",
            message : ""
        }
    },

    handleNameChange(e) {
        e.preventDefault();

        this.setState({name : e.target.value, message : "..."});
    },

    handleSubmit(e) {
        e.preventDefault();

        let name = this.state.name;

        fetch('http://localhost:8080/accountCreation/createAccount?'
            + 'userName=' + name, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({message: 'Account created!'});
            }
            else{
                this.setState({message: 'The account name "' + name + '" already exists!'});
            }
        })
    },

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.name} onChange={this.handleNameChange}/>
                    </label>
                    <input type="submit" value="Create Account!" />
                </form>
                Name: {this.state.name}
                <br/>
                Message: {this.state.message}
            </div>
        );
    }
});

export class AccountCreation extends React.Component {

    render() {
        return(
            <div>
                <NewAccount/>
            </div>
        );
    }
}
