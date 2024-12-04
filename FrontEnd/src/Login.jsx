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
            localStorage.setItem('token', token);
            onLogin();
        })
        .catch((err) => setError(err.message));
    };
return (
<form onSubmit={handleSubmit}>
    <h2>Login</h2>
<input  type="text" placeholder='Username' value={formData.username} onChange={(e)=> setFormData({...formData, username: e.target.value})} required/>
<input type="text" placeholder='password' value={formData.password} onChange={(e)=> setFormData({...formData, password: e.target.value})} required/>
<button type = "submit">Login</button>
</form>
)
};

export default Login;