import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>🐾 专业宠物寄养服务</h1>
          <p>为您的爱宠提供安全、舒适的寄养环境</p>
          <div className="hero-buttons">
            <Link to="/pets" className="btn btn-primary">浏览宠物</Link>
            <Link to="/foster-request" className="btn btn-secondary">申请寄养</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>我们的服务特色</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>安全环境</h3>
              <p>专业的寄养家庭，为您的宠物提供安全的居住环境</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">❤️</div>
              <h3>贴心照料</h3>
              <p>经验丰富的寄养人员，给予宠物专业细致的照顾</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>实时更新</h3>
              <p>定期发送宠物照片和状态更新，让您随时了解宠物情况</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">成功寄养</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">寄养家庭</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">客户满意度</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home