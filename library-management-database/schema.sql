-- ============================================
-- Library Management System - Database Schema
-- Database: librarydb
-- MySQL 8.0+
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS librarydb;
USE librarydb;

-- Drop existing tables for clean setup
DROP TABLE IF EXISTS borrow_record;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS user;

-- ============================================
-- Table: user
-- Stores user authentication and authorization data
-- ============================================
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL COMMENT 'BCrypt hashed password',
    role VARCHAR(50) NOT NULL DEFAULT 'USER' COMMENT 'USER or ADMIN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='User accounts for authentication and authorization';

-- ============================================
-- Table: book
-- Stores library book catalog
-- ============================================
CREATE TABLE book (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(100) DEFAULT NULL,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_title (title),
    INDEX idx_author (author),
    INDEX idx_isbn (isbn),
    INDEX idx_category (category),
    INDEX idx_available (available)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Book catalog with availability status';

-- ============================================
-- Table: borrow_record
-- Tracks book borrowing and returns
-- ============================================
CREATE TABLE borrow_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    borrow_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE DEFAULT NULL,
    returned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_borrow_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT fk_borrow_book FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_book_id (book_id),
    INDEX idx_borrow_date (borrow_date),
    INDEX idx_due_date (due_date),
    INDEX idx_returned (returned)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Book borrowing and return records';

-- ============================================
-- Views for Reporting
-- ============================================

-- View: Currently Borrowed Books
CREATE OR REPLACE VIEW v_currently_borrowed AS
SELECT 
    br.id AS borrow_id,
    u.id AS user_id,
    u.username,
    b.id AS book_id,
    b.title,
    b.author,
    b.isbn,
    br.borrow_date,
    br.due_date,
    DATEDIFF(br.due_date, CURDATE()) AS days_until_due
FROM borrow_record br
INNER JOIN user u ON br.user_id = u.id
INNER JOIN book b ON br.book_id = b.id
WHERE br.returned = FALSE;

-- View: Overdue Books
CREATE OR REPLACE VIEW v_overdue_books AS
SELECT 
    br.id AS borrow_id,
    u.username,
    b.title,
    b.author,
    br.borrow_date,
    br.due_date,
    DATEDIFF(CURDATE(), br.due_date) AS days_overdue
FROM borrow_record br
INNER JOIN user u ON br.user_id = u.id
INNER JOIN book b ON br.book_id = b.id
WHERE br.returned = FALSE 
  AND br.due_date < CURDATE();

-- View: Book Statistics
CREATE OR REPLACE VIEW v_book_statistics AS
SELECT 
    b.id,
    b.title,
    b.author,
    b.category,
    b.available,
    COUNT(br.id) AS total_borrows,
    COUNT(CASE WHEN br.returned = FALSE THEN 1 END) AS currently_borrowed
FROM book b
LEFT JOIN borrow_record br ON b.id = br.book_id
GROUP BY b.id, b.title, b.author, b.category, b.available;

COMMIT;
