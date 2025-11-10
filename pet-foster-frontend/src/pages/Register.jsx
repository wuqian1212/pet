import React, { useState } from 'react'
import { supabase } from '../supabase'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    address: ''
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

    // 验证密码匹配
    if (formData.password !== formData.confirm_password) {
      setMessage('两次输入的密码不匹配')
      setLoading(false)
      return
    }

    try {
      // 注意：这里使用模拟注册，实际项目中应该使用 Supabase 认证
      // const { data: authData, error: authError } = await supabase.auth.signUp({
      //   email: formData.email,
      //   password: formData.password
      // })

      // 模拟注册成功
      setMessage('注册成功！正在跳转到登录页面...')
      setTimeout(() => {
        navigate('/login')
      }, 2000)

      // 实际项目中，这里应该插入用户数据到 users 表
      // const { error: profileError } = await supabase
      //   .from('users')
      //   .insert([{
      //     id: authData.user.id,
      //     email: formData.email,
      //     full_name: formData.full_name,
      //     phone: formData.phone,
      //     address: formData.address
      //   }])

    } catch (error) {
      setMessage('注册失败: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <h2>注册</h2>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="full_name">姓名</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="请输入姓名"
                required
              />
            </div>

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
              <label htmlFor="phone">电话</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="请输入电话号码"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">地址</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="请输入地址"
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
                minLength="6"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password">确认密码</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                placeholder="请再次输入密码"
                minLength="6"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? '注册中...' : '注册'}
            </button>
          </form>

          {message && (
            <div className={`message ${message.includes('成功') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="auth-links">
            <p>已有账号？ <Link to="/login">立即登录</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register