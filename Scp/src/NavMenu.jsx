import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from './supabase';
import './main.css';

function NavMenu() {
  const [items, setItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchItems = async () => {
      let { data } = await supabase.from('SCP').select('id, item');
      setItems(data || []);
    };
    fetchItems();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-title">SCP Directory</div>
      <div className="sidebar-scroll">
        <ul className="sidebar-list">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to={`/item/${item.id}`}
                className={`sidebar-link ${location.pathname === `/item/${item.id}` ? 'active' : ''}`}
              >
                {item.item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default NavMenu;
