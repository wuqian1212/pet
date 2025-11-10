-- 简化的测试数据插入脚本
-- 直接在 Supabase SQL Editor 中执行

-- 清除现有数据（谨慎使用）
-- DELETE FROM foster_orders;
-- DELETE FROM pets;
-- DELETE FROM users;

-- 插入测试用户
INSERT INTO users (email, password_hash, full_name, phone, address, role) VALUES 
('test@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '测试用户', '13800138000', '北京市测试地址', 'user');

-- 插入测试宠物
INSERT INTO pets (owner_id, name, species, breed, age, weight, gender, description, special_needs, image_url, is_available) VALUES 
((SELECT id FROM users WHERE email = 'test@example.com' LIMIT 1), 
 '小白', '狗', '金毛', 3, 25.5, 'male', '温顺的金毛犬，适合家庭寄养', '需要每天散步两次', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', true),

((SELECT id FROM users WHERE email = 'test@example.com' LIMIT 1), 
 '咪咪', '猫', '英短', 2, 4.2, 'female', '安静的英国短毛猫', '需要高质量猫粮', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', true),

((SELECT id FROM users WHERE email = 'test@example.com' LIMIT 1), 
 '旺财', '狗', '拉布拉多', 4, 30.0, 'male', '活泼的拉布拉多，喜欢玩耍', '需要大量运动', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', true);

-- 插入测试寄养订单
INSERT INTO foster_orders (pet_id, owner_id, foster_parent_id, start_date, end_date, total_price, status, special_instructions) VALUES 
((SELECT id FROM pets WHERE name = '小白' LIMIT 1),
 (SELECT id FROM users WHERE email = 'test@example.com' LIMIT 1),
 (SELECT id FROM users WHERE email = 'test@example.com' LIMIT 1),
 '2024-01-15', '2024-01-20', 300.00, 'completed', '小白很乖，请按时喂食'),

((SELECT id FROM pets WHERE name = '咪咪' LIMIT 1),
 (SELECT id FROM users WHERE email = 'test@example.com' LIMIT 1),
 (SELECT id FROM users WHERE email = 'test@example.com' LIMIT 1),
 '2024-02-01', '2024-02-05', 200.00, 'pending', '咪咪比较独立，请保持环境安静');

-- 验证数据
SELECT '=== 用户表数据 ===' as info;
SELECT id, email, full_name, role FROM users;

SELECT '=== 宠物表数据 ===' as info;
SELECT p.id, p.name, p.species, p.breed, p.age, p.is_available, u.email as owner_email 
FROM pets p 
JOIN users u ON p.owner_id = u.id;

SELECT '=== 寄养订单表数据 ===' as info;
SELECT fo.id, p.name as pet_name, fo.start_date, fo.end_date, fo.total_price, fo.status 
FROM foster_orders fo 
JOIN pets p ON fo.pet_id = p.id;