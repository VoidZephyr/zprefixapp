import React, {useState} from 'react';

const Login = ({onLogin}) => {
    const [formData, setFormData] = useState ({username:'',password: ""});
    const [error, setError] = useState(null)
}