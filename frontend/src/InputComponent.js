import React, { useState } from 'react';
import './App.css';




export default class InputComponent extends React.Component {

     //a contructor for the input component
    //sets up handlechange and handlesubmit
    //and holds the name inputted and what the server sends back
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            response: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //when changed, update the value in IC
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    //when the submit button is pressed,
    //first print what was typed in to the console
    //then fetch /result, sending the jsonified input to flask
    //then when you get a response, update the response value in IC
    handleSubmit(event) {
        event.preventDefault();
        console.log('Name submitted: ' + this.state.value);
        fetch("/result", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type": "application/json",
            },
            body: JSON.stringify({ name: this.state.value })
        }
        ).then(response => {
            console.log(response.json())
            return response.json()
        })
            .then(json => {

                this.setState({ response: json })
            })
    }

    //the renderer
    //ties onSubmit to our eariler handleSubmit
    //makes the layout for the input parts of the page
    //including the input text box and the submit query button
    render() {
        return (
            <div>
                
            <form onSubmit={this.handleSubmit}>
                
                    <p> Your Input Request to Server </p>
                        <label>
                        First Name:
                            <input type="text" onChange={this.handleChange} value={this.state.value} />
                            <input type="submit"/>
                    </label>
                    
                
                
                </form>
                <h2> Server Response: {this.state.response} </h2>
            </div>
        );
    }
}