import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../utils/mutations';
import {useParams} from 'react-router-dom';
const CreateReview = () => {
  const [reviewText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const { id: shopId } = useParams();
  const [addReview, { error }] = useMutation(CREATE_REVIEW);
  // update state based on form input changes
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      await addReview({
        variables: { 
            shopId,
            reviewText }
      });
console.log(reviewText);
      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <p className={`${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span style={{ color: "red"}}><br /> Something went wrong...</span>}
      </p>
      <form
        className=""
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new review..."
          value={reviewText}
          className="review-text-area"          
          onChange={handleChange}
        ></textarea>
        <br></br>
        <button className="" type="submit" style={{ color: "white" , background: "#6415FF" }}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreateReview;

