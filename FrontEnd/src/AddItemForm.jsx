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



    
}


<form>
    <input>name</input>
    <input>description</input>
    <input>quantity</input>
    <button type="submit">Add Item</button>
</form>


export default AddItemForm;