import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import './FosterRequest.css'

function FosterRequest() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    pet_id: '',
    start_date: '',
    end_date: '',
    special_instructions: '',
    total_price: 0
  })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchAvailablePets()
  }, [])

  const fetchAvailablePets = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('id, name, species, breed')
        .eq('is_available', true)

      if (error) throw error
      setPets(data || [])
    } catch (error) {
      console.error('获取宠物列表失败:', error)
      // 模拟数据
      setPets([
        { id: '1', name: '小白', species: '狗', breed: '金毛' },
        { id: '2', name: '咪咪', species: '猫', breed: '英短' },
        { id: '3', name: '旺财', species: '狗', breed: '柴犬' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculatePrice = () => {
    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date)
      const end = new Date(formData.end_date)
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
      const price = days * 50 // 假设每天50元
      setFormData(prev => ({ ...prev, total_price: price }))
    }
  }

  useEffect(() => {
    calculatePrice()
  }, [formData.start_date, formData.end_date])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      // 这里需要获取当前登录用户的ID
      const userId = 'current-user-id' // 应该从认证状态获取
      
      const { data: petData } = await supabase
        .from('pets')
        .select('owner_id')
        .eq('id', formData.pet_id)
        .single()

      if (!petData) {
        throw new Error('选择的宠物不存在')
      }

      const { error } = await supabase
        .from('foster_orders')
        .insert([{
          pet_id: formData.pet_id,
          owner_id: petData.owner_id,
          foster_parent_id: userId,
          start_date: formData.start_date,
          end_date: formData.end_date,
          total_price: formData.total_price,
          special_instructions: formData.special_instructions,
          status: 'pending'
        }])

      if (error) throw error

      setMessage('寄养申请提交成功！我们会尽快与您联系。')
      setFormData({
        pet_id: '',
        start_date: '',
        end_date: '',
        special_instructions: '',
        total_price: 0
      })
    } catch (error) {
      setMessage('提交失败: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="loading">加载中...</div>

  return (
    <div className="foster-request-page">
      <div className="container">
        <h1>寄养申请</h1>
        <p className="page-description">填写寄养申请信息</p>

        <form className="foster-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pet_id">选择宠物</label>
            <select
              id="pet_id"
              name="pet_id"
              value={formData.pet_id}
              onChange={handleInputChange}
              required
            >
              <option value="">请选择要寄养的宠物</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} - {pet.species} ({pet.breed})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start_date">开始日期</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="end_date">结束日期</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                min={formData.start_date}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="total_price">预估费用</label>
            <input
              type="number"
              id="total_price"
              name="total_price"
              value={formData.total_price}
              readOnly
              className="price-input"
            />
            <small className="form-text">费用计算：每天 50 元</small>
          </div>

          <div className="form-group">
            <label htmlFor="special_instructions">特殊说明</label>
            <textarea
              id="special_instructions"
              name="special_instructions"
              value={formData.special_instructions}
              onChange={handleInputChange}
              rows="4"
              placeholder="请描述宠物的特殊需求、习惯或注意事项..."
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={submitting || !formData.pet_id || !formData.start_date || !formData.end_date}
          >
            {submitting ? '提交中...' : '提交申请'}
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('成功') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default FosterRequest