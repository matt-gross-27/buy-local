import React from "react";
import { useQuery } from '@apollo/react-hooks';
import tw from "twin.macro";
import { GET_SHOPS } from "../../utils/queries"
import TabGrid from "components/cards/TabCardGrid.js";

const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;


const GetAllShops = () => {


    const { loading, data }  = useQuery(GET_SHOPS);
    const shops = data?.shops || [];

    if (loading) {
        return <h2>Loading Shop...</h2>
    }

const tabs = {
       Food: shops.filter(shop => shop.shopType === 'Food').map(shop => {
            return {
                imageSrc: `https://res.cloudinary.com/dylyqjirh/image/upload/v1621788774/${shop.hero}`,
                title: shop.name,
                content: shop.description,
                location: `${shop.city}, ${shop.state}`,
                rating: shop.ratingAvg,
                reviews: shop.reviewCount,
                url: `/shop/${shop._id}`
        }
        }),
        Sweets: shops.filter(shop => shop.shopType === 'Sweets').map(shop =>{
            return {
                imageSrc: `https://res.cloudinary.com/dylyqjirh/image/upload/v1621788774/${shop.hero}`,
                title: shop.name,
                content: shop.description,
                location: `${shop.city}, ${shop.state}`,
                rating: shop.ratingAvg,
                reviews: shop.reviewCount,
                url: `/shop/${shop._id}`
            }
        }),
        Clothing: shops.filter(shop => shop.shopType === 'Clothing').map(shop => {
            return {
                imageSrc: `https://res.cloudinary.com/dylyqjirh/image/upload/v1621788774/${shop.hero}`,
                title: shop.name,
                content: shop.description,
                location: `${shop.city}, ${shop.state}`,
                rating: shop.ratingAvg,
                reviews: shop.reviewCount,
                url: `/shop/${shop._id}`
            }
        }),
        Other: shops.filter(shop => shop.shopType === 'Other').map(shop =>{
            return {
                imageSrc: `https://res.cloudinary.com/dylyqjirh/image/upload/v1621788774/${shop.hero}`,
                title: shop.name,
                content: shop.description,
                location: `${shop.city}, ${shop.state}`,
                rating: shop.ratingAvg,
                reviews: shop.reviewCount,
                url: `/shop/${shop._id}`
            }
        }),

    }

 // const {data: shopsData} = useQuery(GET_SHOPS)


return (
        
    <TabGrid
        heading={
          <>
            Checkout our <HighlightedText>vendors!</HighlightedText>

          </>
        }
        tabs={
            tabs
        }
        
      />


  );
}

export default GetAllShops