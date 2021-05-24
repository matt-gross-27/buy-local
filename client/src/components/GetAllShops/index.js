import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GET_SHOPS, GET_SHOP_BY_ID } from "../../utils/queries"
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import GetSingleShop from "../../pages/SingleShop";

const GetAllShops = () => {

    const { loading, data }  = useQuery(GET_SHOPS);
    const shopsData = data?.shops || [];
    console.log(shopsData)

    if (loading) {
        return <h2>Loading Shop...</h2>
    }

 // const {data: shopsData} = useQuery(GET_SHOPS)



return (
        <div className="all-shops-cards">
            {shopsData.map(shop => (
            <div className="card-all-shops row">
                <div className="container container-all-shops column card">
                    <div className="card-text">{shop.name}</div>
                    <div className="card-text">{shop.description}</div>
                    <div className="card-text">{shop.instagram}</div>
                    <div className="card-text">Average Rating: {shop.ratingAvg} Stars</div>
                      <Link 
                      to={`/shop/${shop._id}`}>
                          <button>View Shop</button>
                      </Link>
                </div>
            </div>
            ))}
        </div>

  );
}
export default GetAllShops