import { createClient } from '@supabase/supabase-js'

// 从环境变量获取配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// 如果没有配置，提供模拟数据用于开发
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase 配置未设置，使用模拟数据模式')
}

// 创建 Supabase 客户端
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // 模拟 Supabase 客户端，用于开发环境
      from: (table) => ({
        select: () => ({
          eq: () => ({ data: [], error: null }),
          single: () => ({ data: null, error: null })
        }),
        insert: () => ({ data: null, error: null })
      }),
      auth: {
        signInWithPassword: () => ({ data: null, error: null }),
        signUp: () => ({ data: null, error: null })
      }
    }