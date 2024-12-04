import React, {useState} from 'react';

const Login = ({onLogin}) => {
    const [formData, setFormData] = useState ({username:'',password: ""});
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        })
        .then((res) => {
            if (!res.ok) {
            throw new Error('Failed to log in');
            }
            return res.json();
        })
        .then(({ token }) => {
            localStorage.setItem('token', token); // Save token to localStorage
            onLogin(); // Notify parent component
        })
        .catch((err) => setError(err.message));
    };
return (
<form onSubmit={handleSubmit}>
<input  type="text" placeholder='Name' value={formData.name} onChange={(e)=> setFormData({...formData, name: e.target.value})} required/>
<input type="text" placeholder='Description' value={formData.description} onChange={(e)=> setFormData({...formData, description: e.target.value})} required/>
</form>
)
};