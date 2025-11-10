-- 宠物寄养网站测试数据
-- 包含用户、宠物和寄养订单的测试数据

-- 插入测试用户数据
INSERT INTO users (email, password_hash, full_name, phone, address, role) VALUES 
('zhangwei@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '张伟', '13800138000', '北京市朝阳区宠物街1号', 'user'),
('liwei@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '李伟', '13900139000', '上海市浦东新区爱心路2号', 'user'),
('wangfang@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '王芳', '13700137000', '广州市天河区宠物大道3号', 'user'),
('admin@petfoster.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '管理员', '13600136000', '深圳市南山区管理路4号', 'admin');

-- 插入测试宠物数据
INSERT INTO pets (owner_id, name, species, breed, age, weight, gender, description, special_needs, image_url, is_available) VALUES 
-- 张伟的宠物
((SELECT id FROM users WHERE email = 'zhangwei@example.com'), '小白', '狗', '金毛寻回犬', 3, 28.5, 'male', '性格温顺，喜欢和人互动，非常适合家庭寄养', '需要定期梳理毛发，每天需要2小时运动', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', true),
((SELECT id FROM users WHERE email = 'zhangwei@example.com'), '咪咪', '猫', '英国短毛猫', 2, 4.2, 'female', '安静优雅，独立性强，适合公寓环境', '对猫砂要求较高，需要高质量猫粮', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', true),

-- 李伟的宠物
((SELECT id FROM users WHERE email = 'liwei@example.com'), '旺财', '狗', '拉布拉多', 4, 32.0, 'male', '活泼好动，聪明易训练，喜欢和小朋友玩耍', '需要大量运动，每天至少3次散步', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', true),
((SELECT id FROM users WHERE email = 'liwei@example.com'), '花花', '猫', '波斯猫', 1, 3.8, 'female', '温顺可爱，毛发柔顺，适合室内饲养', '需要定期美容，对环境温度敏感', 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400', false), -- 这只暂不可寄养

-- 王芳的宠物
((SELECT id FROM users WHERE email = 'wangfang@example.com'), '豆豆', '狗', '柯基', 2, 12.3, 'female', '短腿可爱，性格活泼，深受大家喜爱', '需要控制体重，避免过度运动', 'https://images.unsplash.com/photo-1583511666407-5f06533f2113?w=400', true),
((SELECT id FROM users WHERE email = 'wangfang@example.com'), '球球', '兔子', '荷兰垂耳兔', 1, 1.5, 'male', '温顺安静，适合小型家庭寄养', '需要新鲜蔬菜，定期清理笼子', 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400', true),

-- 管理员的宠物（用于测试管理功能）
((SELECT id FROM users WHERE email = 'admin@petfoster.com'), '大黄', '狗', '中华田园犬', 5, 22.0, 'male', '忠诚可靠，适应性强，容易照顾', '基本无特殊需求，非常好养', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400', true);

-- 插入测试寄养订单数据
INSERT INTO foster_orders (pet_id, owner_id, foster_parent_id, start_date, end_date, total_price, status, special_instructions) VALUES 
-- 订单1：小白被王芳寄养
((SELECT id FROM pets WHERE name = '小白' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'zhangwei@example.com'),
 (SELECT id FROM users WHERE email = 'wangfang@example.com'),
 '2024-01-15', '2024-01-22', 560.00, 'completed', '小白很乖，请每天带它散步两次，注意不要让它吃太多零食'),

-- 订单2：旺财被张伟寄养（进行中）
((SELECT id FROM pets WHERE name = '旺财' LIMIT 1),
 (SELECT id FROM users WHERE email = 'liwei@example.com'),
 (SELECT id FROM users WHERE email = 'zhangwei@example.com'),
 '2024-02-01', '2024-02-10', 720.00, 'active', '旺财需要大量运动，请确保每天有充足的户外活动时间'),

-- 订单3：咪咪被李伟申请寄养（待审核）
((SELECT id FROM pets WHERE name = '咪咪' LIMIT 1),
 (SELECT id FROM users WHERE email = 'zhangwei@example.com'),
 (SELECT id FROM users WHERE email = 'liwei@example.com'),
 '2024-02-15', '2024-02-20', 300.00, 'pending', '咪咪比较独立，请保持环境安静，不要强行抱它'),

-- 订单4：豆豆被管理员申请寄养（待审核）
((SELECT id FROM pets WHERE name = '豆豆' LIMIT 1),
 (SELECT id FROM users WHERE email = 'wangfang@example.com'),
 (SELECT id FROM users WHERE email = 'admin@petfoster.com'),
 '2024-03-01', '2024-03-07', 420.00, 'pending', '豆豆很可爱，但请注意控制它的饮食，不要喂太多'),

-- 订单5：球球被李伟寄养（已批准）
((SELECT id FROM pets WHERE name = '球球' LIMIT 1),
 (SELECT id FROM users WHERE email = 'wangfang@example.com'),
 (SELECT id FROM users WHERE email = 'liwei@example.com'),
 '2024-01-20', '2024-01-25', 180.00, 'approved', '球球需要新鲜蔬菜，请每天更换饮水，保持笼子清洁');

-- 查询验证数据
-- 查看所有用户
SELECT * FROM users;

-- 查看所有宠物及其主人信息
SELECT p.*, u.full_name as owner_name, u.email as owner_email 
FROM pets p 
JOIN users u ON p.owner_id = u.id;

-- 查看所有寄养订单及其详细信息
SELECT 
    fo.*,
    p.name as pet_name,
    p.species,
    owner.full_name as owner_name,
    foster.full_name as foster_parent_name
FROM foster_orders fo
JOIN pets p ON fo.pet_id = p.id
JOIN users owner ON fo.owner_id = owner.id
LEFT JOIN users foster ON fo.foster_parent_id = foster.id;

-- 统计信息查询
-- 宠物统计
SELECT species, COUNT(*) as count, AVG(age) as avg_age 
FROM pets 
WHERE is_available = true 
GROUP BY species;

-- 寄养统计
SELECT status, COUNT(*) as count 
FROM foster_orders 
GROUP BY status;

-- 收入统计（已完成的订单）
SELECT SUM(total_price) as total_income 
FROM foster_orders 
WHERE status = 'completed';