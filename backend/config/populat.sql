-- Populate Courses table
INSERT INTO Courses (title, description, code, lecturer_id, createdAt, updatedAt) VALUES
('Introduction to Biology', 'Fundamental concepts of biology', 'BIO101', 1, NOW(), NOW()),
('Advanced Mathematics', 'Complex mathematical theories and applications', 'MATH301', 1, NOW(), NOW()),
('World History', 'Overview of major historical events and their impact', 'HIST201', 1, NOW(), NOW()),
('Quantum Physics', 'Principles of quantum mechanics and its applications', 'PHYS401', 1, NOW(), NOW()),
('Environmental Science', 'Study of ecosystems and human impact on environment', 'ENV201', 1, NOW(), NOW()),
('Introduction to Psychology', 'Basic principles of human behavior and mental processes', 'PSY101', 1, NOW(), NOW()),
('Digital Marketing', 'Modern marketing strategies in the digital age', 'MKT301', 1, NOW(), NOW()),
('Artificial Intelligence', 'Fundamentals of AI and machine learning', 'CS401', 1, NOW(), NOW()),
('Human Anatomy', 'Detailed study of human body structure', 'MED201', 1, NOW(), NOW()),
('Astrophysics', 'Study of celestial objects and universe as a whole', 'ASTRO301', 1, NOW(), NOW());

-- Populate Lectures table
INSERT INTO Lectures (title, locked, course_id, createdAt, updatedAt) VALUES
('Cell Structure and Function', FALSE, 1, NOW(), NOW()),
('DNA and Genetics', TRUE, 1, NOW(), NOW()),
('Ecosystem Dynamics', FALSE, 1, NOW(), NOW()),

('Linear Algebra', FALSE, 2, NOW(), NOW()),
('Differential Equations', TRUE, 2, NOW(), NOW()),
('Complex Analysis', TRUE, 2, NOW(), NOW()),

('Ancient Civilizations', FALSE, 3, NOW(), NOW()),
('World Wars', FALSE, 3, NOW(), NOW()),
('Cold War Era', TRUE, 3, NOW(), NOW()),

('Wave-Particle Duality', FALSE, 4, NOW(), NOW()),
('Schrödinger Equation', TRUE, 4, NOW(), NOW()),
('Quantum Entanglement', TRUE, 4, NOW(), NOW()),

('Climate Change', FALSE, 5, NOW(), NOW()),
('Biodiversity', FALSE, 5, NOW(), NOW()),
('Sustainable Development', TRUE, 5, NOW(), NOW()),

('Cognitive Processes', FALSE, 6, NOW(), NOW()),
('Social Psychology', FALSE, 6, NOW(), NOW()),
('Abnormal Psychology', TRUE, 6, NOW(), NOW()),

('Social Media Marketing', FALSE, 7, NOW(), NOW()),
('SEO Strategies', FALSE, 7, NOW(), NOW()),
('Analytics and Metrics', TRUE, 7, NOW(), NOW()),

('Machine Learning Basics', FALSE, 8, NOW(), NOW()),
('Neural Networks', TRUE, 8, NOW(), NOW()),
('Natural Language Processing', TRUE, 8, NOW(), NOW()),

('Skeletal System', FALSE, 9, NOW(), NOW()),
('Cardiovascular System', FALSE, 9, NOW(), NOW()),
('Nervous System', TRUE, 9, NOW(), NOW()),

('Star Formation', FALSE, 10, NOW(), NOW()),
('Black Holes', FALSE, 10, NOW(), NOW()),
('Dark Matter and Dark Energy', TRUE, 10, NOW(), NOW());

-- Populate Assets table
INSERT INTO Assets (URL, lecture_id, createdAt, updatedAt) VALUES
('http://localhost:8000/public/model1/scene.gltf', 1, NOW(), NOW()),
('http://localhost:8000/public/model2/scene.gltf', 1, NOW(), NOW()),
('http://localhost:8000/public/model3/scene.gltf', 2, NOW(), NOW()),
('http://localhost:8000/public/model4/scene.gltf', 4, NOW(), NOW()),
('http://localhost:8000/public/model5/scene.gltf', 4, NOW(), NOW()),
('http://localhost:8000/public/model1/scene.gltf', 7, NOW(), NOW()),
('http://localhost:8000/public/model2/scene.gltf', 7, NOW(), NOW()),
('http://localhost:8000/public/model3/scene.gltf', 10, NOW(), NOW()),
('http://localhost:8000/public/model4/scene.gltf', 13, NOW(), NOW()),
('http://localhost:8000/public/model5/scene.gltf', 13, NOW(), NOW()),
('http://localhost:8000/public/model1/scene.gltf', 16, NOW(), NOW()),
('http://localhost:8000/public/model2/scene.gltf', 19, NOW(), NOW()),
('http://localhost:8000/public/model3/scene.gltf', 19, NOW(), NOW()),
('http://localhost:8000/public/model4/scene.gltf', 22, NOW(), NOW()),
('http://localhost:8000/public/model5/scene.gltf', 25, NOW(), NOW()),
('http://localhost:8000/public/model1/scene.gltf', 25, NOW(), NOW()),
('http://localhost:8000/public/model2/scene.gltf', 28, NOW(), NOW()),
('http://localhost:8000/public/model3/scene.gltf', 28, NOW(), NOW());