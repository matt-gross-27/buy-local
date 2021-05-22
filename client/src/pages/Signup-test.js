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
};

export default Signup;