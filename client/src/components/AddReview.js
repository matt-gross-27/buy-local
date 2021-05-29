import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import Auth from "../utils/auth";
import { CREATE_REVIEW } from "../utils/mutations";
import { GET_SHOP_BY_ID } from "../utils/queries";



function AddReview() {

    const { id: shopId } = useParams();

    const { loading, data } = useQuery(GET_SHOP_BY_ID, {
        variables: { _id: shopId }
      });
    
    const shop = data?.shop || [];

    console.log(shop)

    const reviews = shop.reviews.reviewText

    
    const [createReview, { error }] = useMutation(CREATE_REVIEW);
    const [reviewTextCharCount, setReviewTextCharCount] = useState(0);
    // const [success, setSuccess] = useState(false)
    const [reviewText, setReviewText] = useState('');
    const [formState, setFormState] = useState({
        reviews
    });


    const handleChange = event => {
        const { name, value } = event.target;

        if (event.target.name === 'reviewText') {
            if (event.target.value.length < 150) {
                setReviewText(event.target.value);
                setReviewTextCharCount(event.target.value.length);
                console.log(value)
            }
        } else {

            setFormState({
              ...formState,
              [name]: value
            });
          }

    }

        const handleFormSubmit = async event => {
            event.preventDefault();

            try {
                if (Auth.loggedIn()) {
                    
                    const { data } = await createReview({
                        variables: { ...formState, shopId }
                    });

                    if (data) {
                        //setSuccess(true);
                        console.log(reviewText)
                        console.log('clicked')
                    }
                }
                

            } catch (error) {
                console.log(error)
                console.log('failed submit')
            }

        };

        return (

            <form onSubmit={handleFormSubmit}>
                <textarea
                    rows="3"
                    placeholder="Write your review here!"
                    type="text"
                    id="reviewText"
                    name="reviewText"
                    value={reviewText}
                    onChange={handleChange}>

                </textarea>
                <br></br>
                <button type="submit">Submit Your Review</button>
            </form>

        );

    
    };

export default AddReview;