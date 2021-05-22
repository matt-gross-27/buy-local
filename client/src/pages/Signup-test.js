import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { CREATE_USER } from "../utils/mutations";

function Signup(props) {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    const [createUser] = useMutation(CREATE_USER);

    const handleFormSubmit = async event => {
        event.preventDefault();
        const mutationResponse = await createUser({
            variables: {
                email: formState.email, password: formState.password,
                firstName: formState.firstName, lastName: formState.lastName
            }
        });
        const token = mutationResponse.data.createUser.token;
        Auth.login(token);
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div className="container">
            <Link to="/login">
            Already have an account?
            </Link>

        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                placeholder="Please enter your First name"
                name="firstName"
                type="firstName"
                id="firstName"
                onChange={handleChange}
                />
            </div>

            </form>
        </div>
    );
};

export default Signup;