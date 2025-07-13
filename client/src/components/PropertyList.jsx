import React from "react";

const PropertyList = ({ properties, onDeleteProperty, onContactOwner }) => {
  if (!properties || properties.length === 0) {
    return <p>No properties available.</p>;
  }

  return (
    <div>
      <h3>Available Properties</h3>
      {properties.map((property) => (
        <div key={property._id}>
          <h4>{property.title}</h4>
          <p>{property.description}</p>
          {property.image && (
            <img src={property.image} alt={property.title} style={{ maxWidth: "100%", height: "auto" }} />
          )}
          <p>
            <strong>Contact:</strong> {property.contact}
          </p>
          <button onClick={() => onContactOwner(property.contact)}>Contact Owner</button>
          <button onClick={() => onDeleteProperty(property._id)}>Delete Property</button>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
