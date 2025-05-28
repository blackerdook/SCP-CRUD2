import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import ImageUploader from './ImageUploader';
import './main.css';

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [newRecord, setNewRecord] = useState({ item: '', class: '', description: '', containment: '', image: '' });
  const [editRecord, setEditRecord] = useState(null);
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    let { data } = await supabase.from('SCP').select('*');
    setItems(data || []);
  };

  const addItem = async () => {
    const { error } = await supabase.from('SCP').insert([newRecord]);
    if (!error) {
      setNewRecord({ item: '', class: '', description: '', containment: '', image: '' });
      setConfirmation('Record added!');
      fetchItems();
      setTimeout(() => setConfirmation(''), 2000);
    } else {
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (id) => {
    await supabase.from('SCP').delete().eq('id', id);
    fetchItems();
  };

  const startEditing = (item) => {
    setEditRecord({ ...item });
  };

  const saveEdit = async () => {
    const { error } = await supabase.from('SCP').update(editRecord).eq('id', editRecord.id);
    if (!error) {
      setEditRecord(null);
      fetchItems();
    } else {
      console.error('Error saving edit:', error);
    }
  };

  return (
    <div className="admin-panel-layout">
      <div className="admin-records-scroll">
        <h2>Existing Records</h2>
        {confirmation && <div style={{ color: 'limegreen', marginBottom: '1rem' }}>{confirmation}</div>}
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {editRecord && editRecord.id === item.id ? (
                <>
                  <input
                    value={editRecord.item}
                    onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })}
                  />
                  <input
                    value={editRecord.class}
                    onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })}
                  />
                  <textarea
                    value={editRecord.description}
                    onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })}
                  />
                  <textarea
                    value={editRecord.containment}
                    onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })}
                  />
                  <input
                    value={editRecord.image}
                    onChange={(e) => setEditRecord({ ...editRecord, image: e.target.value })}
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditRecord(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <strong>{item.item}</strong> ({item.class})<br />
                  <button onClick={() => startEditing(item)}>Edit</button>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-create-form">
        <h3>Create New Record</h3>
        <input
          placeholder="Item"
          value={newRecord.item}
          onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })}
        />
        <input
          placeholder="Class"
          value={newRecord.class}
          onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newRecord.description}
          onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
        />
        <textarea
          placeholder="Containment"
          value={newRecord.containment}
          onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })}
        />
        <div style={{ padding: '1rem' }}>
          <ImageUploader setImageUrl={(url) => setNewRecord((prev) => ({ ...prev, image: url }))} />
        </div>
        <input
          placeholder="Image URL (optional)"
          value={newRecord.image}
          onChange={(e) => setNewRecord({ ...newRecord, image: e.target.value })}
        />
        {newRecord.image && (
          <img src={newRecord.image} alt="Preview" style={{ width: '200px', marginTop: '1rem' }} />
        )}
        <button onClick={addItem}>Add</button>
      </div>
    </div>
  );
}

export default AdminPanel;