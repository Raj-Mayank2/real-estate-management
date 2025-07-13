import React, { useState } from "react";

const AddProperty = ({ onAddProperty }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !image || !contact) {
      alert("Please fill in all fields");
      return;
    }

    const newProperty = {
      title,
      description,
      image,
      contact,
    };

    onAddProperty(newProperty);

    setTitle("");
    setDescription("");
    setImage("");
    setContact("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Property</h3>

      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Property title"
      />

      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Property description"
        rows={3}
      />

      <label>Image URL:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
      />

      <label>Contact Info:</label>
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Contact details"
      />

      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddProperty;
