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

    //according to the internet this is better than using onclick event for react app
    const handleSubmit = (e) => {
        e.preventDefault();


        fetch('http://localhost:5000/items', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
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
            onItemAdded(newItem); // Notify parent about the new item
            setFormData({ name: '', description: '', quantity: 0, user_id: 1 }); // Reset form
        })
        .catch((err) => console.error('Error adding item:', err));
    };


<form>
    <input>name</input>
    <input>description</input>
    <input>quantity</input>
    <button type="submit">Add Item</button>
</form>


export default AddItemForm;