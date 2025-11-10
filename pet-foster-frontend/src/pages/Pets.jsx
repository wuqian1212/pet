import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import './Pets.css'

function Pets() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('pets')
        .select(`
          *,
          users!inner(full_name)
        `)
        .eq('is_available', true)

      if (error) throw error
      setPets(data || [])
    } catch (error) {
      setError(error.message)
      // 模拟数据用于演示
      setPets([
        {
          id: '1',
          name: '小白',
          species: '狗',
          breed: '金毛',
          age: 3,
          weight: 25.5,
          gender: 'male',
          description: '温顺友好的金毛犬，喜欢和小朋友玩耍',
          special_needs: '需要每天散步两次',
          users: { full_name: '张先生' }
        },
        {
          id: '2',
          name: '咪咪',
          species: '猫',
          breed: '英短',
          age: 2,
          weight: 4.2,
          gender: 'female',
          description: '安静可爱的英短猫咪，喜欢晒太阳',
          special_needs: '需要定期梳理毛发',
          users: { full_name: '李女士' }
        },
        {
          id: '3',
          name: '旺财',
          species: '狗',
          breed: '柴犬',
          age: 1,
          weight: 8.5,
          gender: 'male',
          description: '活泼的小柴犬，精力充沛',
          special_needs: '需要大量运动和玩具',
          users: { full_name: '王先生' }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getSpeciesIcon = (species) => {
    switch (species) {
      case '狗': return '🐕'
      case '猫': return '🐱'
      case '鸟': return '🐦'
      case '兔': return '🐰'
      default: return '🐾'
    }
  }

  const getGenderIcon = (gender) => {
    switch (gender) {
      case 'male': return '♂️'
      case 'female': return '♀️'
      default: return '❓'
    }
  }

  if (loading) return <div className="loading">加载中...</div>
  if (error) return <div className="error">错误: {error}</div>

  return (
    <div className="pets-page">
      <div className="container">
        <h1>可寄养宠物</h1>
        <p className="page-description">浏览所有可寄养的可爱宠物</p>
        
        <div className="pets-grid">
          {pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <div className="pet-header">
                <div className="pet-icon">{getSpeciesIcon(pet.species)}</div>
                <div className="pet-info">
                  <h3>{pet.name}</h3>
                  <p className="pet-owner">主人: {pet.users?.full_name}</p>
                </div>
              </div>
              
              <div className="pet-details">
                <div className="pet-detail">
                  <span className="label">品种:</span>
                  <span>{pet.breed}</span>
                </div>
                <div className="pet-detail">
                  <span className="label">年龄:</span>
                  <span>{pet.age} 岁</span>
                </div>
                <div className="pet-detail">
                  <span className="label">体重:</span>
                  <span>{pet.weight} kg</span>
                </div>
                <div className="pet-detail">
                  <span className="label">性别:</span>
                  <span>{getGenderIcon(pet.gender)}</span>
                </div>
              </div>
              
              <div className="pet-description">
                <p>{pet.description}</p>
              </div>
              
              {pet.special_needs && (
                <div className="pet-special-needs">
                  <strong>特殊需求:</strong> {pet.special_needs}
                </div>
              )}
              
              <button className="btn btn-primary btn-full">
                申请寄养
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pets