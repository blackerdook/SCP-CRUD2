import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabase';
import './main.css';

function ItemDetail() {
  const { id } = useParams(); // Get the SCP ID from the route
  const [itemData, setItemData] = useState(null);

  // Fetch item details when the ID changes
  useEffect(() => {
    const fetchItemDetails = async () => {
      let { data } = await supabase.from('SCP').select('*').eq('id', id).single();
      setItemData(data);
    };
    fetchItemDetails();
  }, [id]);

  return itemData ? (
    // Display item details
    <div className="item-detail-page">
      <div className="item-detail-header">
        <h1 className="item-title">{itemData.item}</h1>
        <p className="item-class">Class: {itemData.class}</p>
      </div>

      <div className="item-detail-grid">
        {itemData.image && (
          <div className="item-image-container">
            <img src={itemData.image} alt={itemData.item} className="item-image" />
          </div>
        )}

        <div className="item-info">
          <div className="item-section">
            <h2>Description</h2>
            <p>{itemData.description}</p>
          </div>

          <div className="item-section">
            <h2>Containment Procedures</h2>
            <p>{itemData.containment}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    // Loading state
    <div className="item-detail-page">
      <p className="loading">Loading SCP data...</p>
    </div>
  );
}

export default ItemDetail;
