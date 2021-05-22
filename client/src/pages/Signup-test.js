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
};

export default Signup;