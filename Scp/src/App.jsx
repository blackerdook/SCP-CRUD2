import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomeHeader from './HomeHeader';
import NavMenu from './NavMenu';
import HomePage from './HomePage';
import ItemDetail from './ItemDetail';
import AdminPanel from './AdminPanel';

function AppContent() {
  const location = useLocation();
  const isDirectory = location.pathname.startsWith('/item');
  const isHome = location.pathname === '/';

  return (
    <>
      <HomeHeader />
      {isDirectory ? (
        <div className="directory-layout">
          <div className="directory-sidebar-scroll">
            <NavMenu />
          </div>
          <div className="directory-content main-content">
            <Routes>
              <Route path="/item/:id" element={<ItemDetail />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className={isHome ? 'home-content-wrapper' : 'main-content'}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
