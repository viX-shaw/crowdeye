import React, { Component } from 'react';

class ValidateName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            validname: null
        };
    }

    componentWillMount() {
        const { steps } = this.props;
        const { name  } = steps;

        this.setState({ name });
    }
    

    componentDidMount() {
        let first_name = this.state.name.value.toLowerCase().split(" ")[0]
            fetch(`https://api.genderize.io/?name=${first_name}`)
            .then(res=>res.json())
            .then(result=>{
                console.log(result)
                if(result.gender !== null && result.probability >= 0.8)
                {
                    this.setState({validname: true}, ()=>{
                            this.props.triggerNextStep({ trigger: '8', value: this.state.name })})
                    }else{
                        this.setState({validname: false}, ()=>{
                            
                        this.props.triggerNextStep({ trigger: 'name', value: "" })
                    })
                }
            })
    }

    render() {
        return (
            this.state.validname === null ? 
            <div>Checking...</div>
            :
            this.state.validname === false ?
            <div>Not a Valid Name</div> 
            :
            <div>Great!</div>

        )
    }
        
}

export default ValidateName;