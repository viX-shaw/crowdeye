import React, { Component } from 'react';
import { findByLabelText } from '@testing-library/dom';

class OrderStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            order: null,
            status: null,
        }

    }

    componentWillMount() {
        const { steps } = this.props;
        const { orderID } = steps;

        fetch("https://yoyopizza.herokuapp.com/checkOrderStatus/", {
            method: 'post',
            body:JSON.stringify({
                orderID: orderID.value
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            if(result.orderStatus) {
                this.setState({name: result.orderStatus[0], 
                    order: result.orderStatus[1],
                status:result.orderStatus[2]})
            }else{
                this.setState({name: false})
            }
            //SetState name, order, status
            this.props.triggerNextStep({trigger: '3', value: ""})
        })
    }

    render() {
        const { name, order, status } = this.state;
        return (
            name?
            <div style={{display: "flex", width:180, flexWrap: "wrap"}}>
                <div style={{paddingBottom: 10, fontWeight: "bold"}}>{name}</div>
                <div style={{paddingBottom: 10}}>{order}</div>
                <div>{status}</div>
            </div>
            :
            name === false?
            <div>Order Not Found</div>:
            <div>...</div>
        );
    }
}

export default OrderStatus;