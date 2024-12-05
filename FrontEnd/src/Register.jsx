import React, {useState} from 'react';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState ('');
    const [error, setError] = useState(null);
    

    const handleRegister = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password}),
        })
        .then((res) => {
            if (!res.ok) {
            throw new Error('Failed to Register');
            }
            return res.json();
        })
        .then((data) => {
        alert("Success, log in");
        })
        .catch((err) => setError(err.message));
    };

    return (
        <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit">Register</button>
        </form>
        </div>
    );
    };

export default Register;