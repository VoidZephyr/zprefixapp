import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PublicItemDetail = () => {
const { id } = useParams();
const [item, setItem] = useState(null);
const [error, setError] = useState(null);
useEffect(() => {
    fetch(`http://localhost:5000/public-items/${id}`)
    .then((res) => res.json())
    .then((data) => setItem(data))
    .catch((err) => setError('Failed to load item details.'));
}, [id]);

const truncateDescription = (desc) =>
    desc.length > 100 ? desc.substring(0, 100) + "..." : desc;

return (
    <div>
    <h1>Item Details</h1>
    {item ? (
        <div>
        <h2>{item.name}</h2>
        <p>{truncateDescription(item.description)}</p>
        <p>Quantity: {item.quantity}</p>
        </div>
    ) : (
        <p>Loading item details...</p>
    )}
    </div>
);
};

export default PublicItemDetail;
