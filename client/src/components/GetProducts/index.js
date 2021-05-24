import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { GET_PRODUCTS } from "../../utils/queries";
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';


const GetProducts = () => {
    const { loading, data }= useQuery(GET_PRODUCTS);
    const productData = data?.products || []

    console.log(productData)

    if (loading) {
        return <h2>Loading Products...</h2>
    }
    
    return (
        <div className="all-shops-cards">
            {productData.map(product => (
            <div className="card-all-shops row">
                <div className="container container-all-shops column card">
                    <div className="card-text">{product.name}</div>
                    <div className="card-text">{product.description}</div>
                    <div className="card-text">${product.price}</div>
                    <div className="card-text">{product.stock} in stock</div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default GetProducts