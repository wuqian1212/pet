import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🐾 宠物寄养中心
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">首页</Link>
          </li>
          <li className="nav-item">
            <Link to="/pets" className="nav-link">宠物列表</Link>
          </li>
          <li className="nav-item">
            <Link to="/foster-request" className="nav-link">寄养申请</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">登录</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">注册</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar