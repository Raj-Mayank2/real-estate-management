import React, { useState, useEffect } from "react";
import PropertyList from "./components/PropertyList.jsx";
import AddProperty from "./components/AddProperty.jsx";
import axios from "axios";
import "./App.css";

const App = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/properties")
      .then((response) => setProperties(response.data))
      .catch((error) => console.error(error));
  }, []);

  // POST new property to backend, then update state
  const handleAddProperty = async (newProperty) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/properties",
        newProperty
      );
      setProperties((prevProperties) => [...prevProperties, response.data]);
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property.");
    }
  };

  // Contact owner alert
  const handleContactOwner = (contact) => {
    alert(`Contacting the owner of property is ${contact}`);
  };

  // DELETE property from backend, then update state
  const handleDeleteProperty = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:5000/api/properties/${propertyId}`);
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
    }
  };

  return (
    <div className="App">
      <h1 className="Mayank" style={{ margin: "10px 10px" }}>
        Mayank
      </h1>
      <h1 style={{ marginTop: "10px" }}>Real Estate Management</h1>
      <div>
        <AddProperty onAddProperty={handleAddProperty} />
        {/* Pass properties plural */}
        <PropertyList
          onDeleteProperty={handleDeleteProperty}
          properties={properties}
          onContactOwner={handleContactOwner}
        />
      </div>
    </div>
  );
};

export default App;
