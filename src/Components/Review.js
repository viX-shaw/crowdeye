import React, { Component } from 'react';

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            pno: '',
            pizza: '',
            toppings: ''
        };
    }

    componentWillMount() {
        const { steps } = this.props;
        const { name, pno, pizza, toppings } = steps;

        this.setState({ name, pno, pizza, toppings }, ()=>{
            fetch("https://yoyopizza.herokuapp.com/addOrder/", {
                method: 'post',
                body:JSON.stringify({
                    name: this.state.name.value,
                    pno: this.state.pno.value,
                    pizza: this.state.pizza.value,
                    toppings:this.state.toppings.value
                })
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                this.props.triggerNextStep({trigger: 'gen_id', value: result.orderID})
            })
        });
    }

    render() {
        const { name, pno, pizza, toppings } = this.state;
        return (
            <div >
                <h3>Your Order</h3>
                <table style={{ width: '180', display: "flex", flexWrap: "wrap",
                 textAlign: "left",borderSpacing: 5,padding: 5 }}>
                    <tbody>
                        <tr>
                            <th>Pizza</th>
                            <td>{pizza.value}</td>
                        </tr>
                        <tr>
                            <th rowSpan={toppings.value.length}>Toppings</th>
                            {
                                toppings.value.map((entry)=>
                                    <tr><td>{entry}</td></tr>
                                )
                            }
                        </tr>
                        <hr/>
                        <tr>
                            <th>Name</th>
                            <td>{name.value}</td>
                        </tr>
                        <tr>
                            <th>Phone No.</th>
                            <td>{pno.value}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Review;