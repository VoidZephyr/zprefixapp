import React, {useEffect, useState} from 'react';

const AddItemForm =({onItemAdded}) => {
    const [formData, setFormData] = useState(
        {
            name: "",
            description: "",
            quantity: 0,
            user_id: 1,
        }
    );


    const token = localStorage.getItem('token');

    //according to the internet this is better than using onclick event for react app
    const handleSubmit = (e) => {
        e.preventDefault();


        fetch('http://localhost:5000/items', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        body: JSON.stringify(formData),
        })
        .then((res) => {
            if (!res.ok) {
            throw new Error('Failed to create item');
            }
            return res.json();
        })
        .then((newItem) => {
            onItemAdded(newItem);
            setFormData({ name: '', description: '', quantity: 0, user_id: 1 });
        })
        .catch((err) => console.error('Error adding item:', err));
    };

return (
<form onSubmit ={handleSubmit}>
    <h2>New Item</h2>
    <input  type="text" placeholder='Name' value={formData.name} onChange={(e)=> setFormData({...formData, name: e.target.value})} required/>
    <input type="text" placeholder='Description' value={formData.description} onChange={(e)=> setFormData({...formData, description: e.target.value})} required/>
    <input type="number" placeholder='Quantity' value={formData.quantity} onChange={(e)=> setFormData({...formData, quantity: parseInt(e.target.value, 10)})} required/>
    <button type="submit">Add Item</button>
</form>
);
};

export default AddItemForm;