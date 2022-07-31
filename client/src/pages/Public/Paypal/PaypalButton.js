import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { connect } from 'react-redux';
import { checkoutState, cinemaState } from '../../../store/actions'

const PaypalCheckoutButton = (props) => {
    const { product } = props;
    const [Seat, setSeat] = useState()
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    // if(paidFor){
    //     alert("Thank You for purchasing from Eazy2Code");
    // }

    // if(error){
    //     alert(error);
    // }
    useEffect(() => {
        setSeat(props.selectedSeats.length)
    }, [props.selectedSeats.length])
    console.log("first", (props.selectedSeats.length * props.cinema.ticketPrice))
    return (
        <PayPalScriptProvider>
            <PayPalButtons
                style={{ maxWidth: "200px!important", minHeight: "150px!important", paddingTop:"10px!important" }}
                forceReRender={[Seat]}
                onClick={(data, actions) => {
                    const hasAlreadyBoughtCourse = false;
                    if (hasAlreadyBoughtCourse) {
                        setError("You Already bough this course");
                        return actions.reject();
                    } else {
                        return actions.resolve();
                    }
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: "product.description",
                                amount: {
                                    value: Seat,
                                },
                            },
                        ],
                    });
                }}
                onApprove={async (data, action) => {
                    const order = await action.order.capture();
                    console.log("order", order);
                    props.onBookSeats();
                    handleApprove(data.orderID);
                }}
                onCancel={() => { }}
                onError={(err) => {
                    setError(err);
                    console.log("PayPal Checkout onError", err);
                }}
            />
        </PayPalScriptProvider>
    )
}

const mapStateToProps = ({ checkoutState, cinemaState }) => ({
    selectedSeats: checkoutState.selectedSeats,
    cinema: cinemaState.selectedCinema,
});

export default connect(mapStateToProps)(PaypalCheckoutButton)