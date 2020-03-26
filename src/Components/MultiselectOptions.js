import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { red } from 'color-name';

const Button = styled.button`
background: ${props => props.primary ? "blue" : props.secondary?"blueviolet":"white"};
color: ${props => props.primary ? "white" : props.secondary?"white":"blueviolet"};
font-size: 1em;
margin: 0.2em;
padding: 0.25em 1em;
border: 2px solid blue;
border-radius: 10px;
`;

class MultiselectOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            chosen: [],
            showChosenItems: false
        };
        // this.onClickButton = this.onClickButton.bind(this)
    }

    componentWillMount() {
        const { options } = this.props;
        //   const { name, gender, age } = steps;

        this.setState({ options });
    }

    onClickButton =(entry) =>{
        this.setState({chosen: [...this.state.chosen, entry]})
        this.setState({options: this.state.options.filter(option=>option!==entry)})
    }
    removeChosenOptions = (entry) => {
        this.setState({options: [...this.state.options, entry]})
        this.setState({chosen: this.state.chosen.filter(option=>option!==entry)})

    }

    render() {
        // console.log(this.state)
        const { options } = this.state;
        return (
            !this.state.showChosenItems?
            <div style={{ width: '100%' }}>
                <h3>Select Toppings</h3>
                <div style={{display: "flex", flexWrap: "wrap", width: 180}}>
                {
                    options.map((entry, idx) =>
                        <div>
                            <Button onClick={()=>this.onClickButton(entry)}>{entry}</Button>
                        </div>
                    )
                }
                </div>
                <br />
                <Button primary onClick={() => {
                    this.props.triggerNextStep({ trigger: '6', value: this.state.chosen })
                    this.setState({showChosenItems: true})
                    }}>Done</Button>
                {
                    this.state.chosen.length>0 &&
                    <div style= {{display:"flex", flexWrap: "wrap", width: 180}}>
                       {
                        this.state.chosen.map((entry, idx)=>
                            <Button secondary onClick={() => {this.removeChosenOptions(entry)}}>{entry}</Button>
                    )} 
                    </div>
                }
            </div>
            :
            <div>
                <h3>Selected Toppings</h3>
                <div style= {{display:"flex", flexWrap: "wrap", width: 180}}>
                {
                    this.state.chosen.map((entry, idx)=>
                        <Button primary>{entry}</Button>
                    )}
                </div>
            </div>
        );
    }
}


export default MultiselectOptions;