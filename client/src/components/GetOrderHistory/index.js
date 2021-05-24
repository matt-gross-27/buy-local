import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { MY_ORDER_HISTORY } from "../../utils/queries";
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';


const GetOrderHistory = () => {
    const { loading, data }= useQuery(MY_ORDER_HISTORY);
    const orderHistoryData = data?.myOrderHistory || []

    console.log(orderHistoryData)

    if (loading) {
        return <h2>Loading Order History...</h2>
    }
    return (
        <div>
            {orderHistoryData.map(orderHistory => (
            <div>
                <h1>{orderHistory._id}</h1>
            </div>
            ))}
        </div>
    )   
}

export default GetOrderHistory