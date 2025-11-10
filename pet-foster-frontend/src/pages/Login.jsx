import React, { useState } from 'react'
import { supabase } from '../supabase'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // 注意：这里使用模拟登录，实际项目中应该使用 Supabase 认证
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email: formData.email,
      //   password: formData.password
      // })

      // 模拟登录验证
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        setMessage('登录成功！')
        setTimeout(() => {
          navigate('/')
        }, 1500)
      } else {
        throw new Error('邮箱或密码错误')
      }
    } catch (error) {
      setMessage('登录失败: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <h2>登录</h2>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">邮箱</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="请输入邮箱"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="请输入密码"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          {message && (
            <div className={`message ${message.includes('成功') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="auth-links">
            <p>还没有账号？ <Link to="/register">立即注册</Link></p>
          </div>

          <div className="demo-info">
            <h4>测试账号</h4>
            <p>邮箱: demo@example.com</p>
            <p>密码: password</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login