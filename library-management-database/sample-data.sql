-- ============================================
-- Library Management System - Sample Data
-- Database: librarydb
-- ============================================

USE librarydb;

-- ============================================
-- Sample Users
-- Passwords are BCrypt hashed
-- Plain text for reference:
--   admin: admin123
--   user1: password123
--   user2: password123
-- ============================================

INSERT INTO user (username, password, role) VALUES
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN'),
('john_doe', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER'),
('jane_smith', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER');

-- ============================================
-- Sample Books - Fiction
-- ============================================
INSERT INTO book (title, author, isbn, category, available) VALUES
('To Kill a Mockingbird', 'Harper Lee', '978-0-06-112008-4', 'Fiction', TRUE),
('1984', 'George Orwell', '978-0-452-28423-4', 'Fiction', TRUE),
('Pride and Prejudice', 'Jane Austen', '978-0-14-143951-8', 'Fiction', TRUE),
('The Great Gatsby', 'F. Scott Fitzgerald', '978-0-7432-7356-5', 'Fiction', TRUE),
('The Catcher in the Rye', 'J.D. Salinger', '978-0-316-76948-0', 'Fiction', TRUE),
('Animal Farm', 'George Orwell', '978-0-452-28424-1', 'Fiction', TRUE),
('The Hobbit', 'J.R.R. Tolkien', '978-0-547-92822-7', 'Fantasy', TRUE),
('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '978-0-439-70818-8', 'Fantasy', TRUE),
('The Lord of the Rings', 'J.R.R. Tolkien', '978-0-544-00341-5', 'Fantasy', TRUE);

-- ============================================
-- Sample Books - Science & Technology
-- ============================================
INSERT INTO book (title, author, isbn, category, available) VALUES
('A Brief History of Time', 'Stephen Hawking', '978-0-553-38016-3', 'Science', TRUE),
('Sapiens', 'Yuval Noah Harari', '978-0-06-231609-7', 'Science', TRUE),
('Clean Code', 'Robert C. Martin', '978-0-13-235088-4', 'Technology', TRUE),
('Design Patterns', 'Gang of Four', '978-0-201-63361-0', 'Technology', TRUE),
('Introduction to Algorithms', 'Thomas H. Cormen', '978-0-262-03384-8', 'Technology', TRUE);

-- ============================================
-- Sample Books - Business & Self-Help
-- ============================================
INSERT INTO book (title, author, isbn, category, available) VALUES
('Think and Grow Rich', 'Napoleon Hill', '978-1-60459-643-8', 'Self-Help', TRUE),
('Atomic Habits', 'James Clear', '978-0-7352-1129-2', 'Self-Help', TRUE),
('Rich Dad Poor Dad', 'Robert Kiyosaki', '978-1-61268-001-1', 'Business', TRUE),
('The Lean Startup', 'Eric Ries', '978-0-307-88789-4', 'Business', TRUE),
('Zero to One', 'Peter Thiel', '978-0-8041-3929-8', 'Business', TRUE);

-- ============================================
-- Sample Borrow Records
-- ============================================

-- Active borrows (john_doe has 2 books)
INSERT INTO borrow_record (user_id, book_id, borrow_date, due_date, returned) VALUES
(2, 1, DATE_SUB(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 9 DAY), FALSE),
(2, 7, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 11 DAY), FALSE);

-- jane_smith has 1 book
INSERT INTO borrow_record (user_id, book_id, borrow_date, due_date, returned) VALUES
(3, 12, DATE_SUB(CURDATE(), INTERVAL 7 DAY), DATE_ADD(CURDATE(), INTERVAL 7 DAY), FALSE);

-- Past returned books
INSERT INTO borrow_record (user_id, book_id, borrow_date, due_date, return_date, returned) VALUES
(2, 2, DATE_SUB(CURDATE(), INTERVAL 30 DAY), DATE_SUB(CURDATE(), INTERVAL 16 DAY), DATE_SUB(CURDATE(), INTERVAL 17 DAY), TRUE),
(3, 3, DATE_SUB(CURDATE(), INTERVAL 25 DAY), DATE_SUB(CURDATE(), INTERVAL 11 DAY), DATE_SUB(CURDATE(), INTERVAL 13 DAY), TRUE);

COMMIT;

-- ============================================
-- Verification Queries
-- ============================================

-- Show data summary
SELECT 'Users' AS entity, COUNT(*) AS count FROM user
UNION ALL
SELECT 'Books', COUNT(*) FROM book
UNION ALL
SELECT 'Borrow Records', COUNT(*) FROM borrow_record;

-- Show available books by category
SELECT category, COUNT(*) AS available_count 
FROM book 
WHERE available = TRUE 
GROUP BY category;
