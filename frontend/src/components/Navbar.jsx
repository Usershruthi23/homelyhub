import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Building2, User, LogOut, Shield, LayoutDashboard, PlusCircle, BookmarkCheck } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <Building2 size={28} style={{ color: '#6366f1' }} />
          <span>HomelyHub</span>
        </Link>

        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/properties">
              Properties
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              Contact
            </NavLink>
          </li>

          {user && (
            <>
              {user.role === 'USER' && (
                <li>
                  <NavLink to="/bookings">My Bookings</NavLink>
                </li>
              )}

              {user.role === 'OWNER' && (
                <>
                  <li>
                    <NavLink to="/owner">Owner Hub</NavLink>
                  </li>
                  <li>
                    <NavLink to="/owner/properties/add">Add Property</NavLink>
                  </li>
                </>
              )}

              {user.role === 'ADMIN' && (
                <li>
                  <NavLink to="/admin">Admin Panel</NavLink>
                </li>
              )}
            </>
          )}
        </ul>

        <div className="user-menu">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/dashboard" className="user-badge" style={{ color: '#ffffff', textDecoration: 'none' }}>
                <User size={16} />
                <span>{user.name}</span>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                  {user.role}
                </span>
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
