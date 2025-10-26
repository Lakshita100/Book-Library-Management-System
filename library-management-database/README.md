# Library Management System Database

## Overview
SQL scripts for setting up the Library Management System database.

## Database Information
- **Database Name**: `librarydb`
- **DBMS**: MySQL 8.0+
- **Character Set**: UTF-8 (utf8mb4)

## Files

### 1. `schema.sql`
Creates the database structure:
- **Tables**: user, book, borrow_record
- **Views**: v_currently_borrowed, v_overdue_books, v_book_statistics
- **Indexes**: Optimized for common queries

### 2. `sample-data.sql`
Loads sample data:
- 3 users (1 admin, 2 regular users)
- 19 books across various categories
- Sample borrow records

## Quick Setup

### Option 1: MySQL Command Line
```bash
mysql -u root -p

# Inside MySQL prompt:
source C:/Users/LAKSHITA JAIN/OneDrive/Desktop/LibraryManagementSystem/library-management-database/schema.sql
source C:/Users/LAKSHITA JAIN/OneDrive/Desktop/LibraryManagementSystem/library-management-database/sample-data.sql
```

### Option 2: Command Prompt
```cmd
cd "C:\Users\LAKSHITA JAIN\OneDrive\Desktop\LibraryManagementSystem\library-management-database"
mysql -u root -p < schema.sql
mysql -u root -p < sample-data.sql
```

### Option 3: MySQL Workbench
1. Open MySQL Workbench
2. File → Open SQL Script → Select `schema.sql`
3. Execute
4. Repeat for `sample-data.sql`

## Database Schema

### Tables

#### `user`
```sql
- id (BIGINT, PRIMARY KEY)
- username (VARCHAR, UNIQUE)
- password (VARCHAR) -- BCrypt hashed
- role (VARCHAR) -- 'USER' or 'ADMIN'
- created_at, updated_at (TIMESTAMP)
```

#### `book`
```sql
- id (BIGINT, PRIMARY KEY)
- title (VARCHAR)
- author (VARCHAR)
- isbn (VARCHAR, UNIQUE)
- category (VARCHAR)
- available (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

#### `borrow_record`
```sql
- id (BIGINT, PRIMARY KEY)
- user_id (BIGINT, FOREIGN KEY)
- book_id (BIGINT, FOREIGN KEY)
- borrow_date (DATE)
- due_date (DATE)
- return_date (DATE)
- returned (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

## Sample Credentials

### Database
- Host: `localhost`
- Port: `3306`
- Database: `librarydb`
- Username: `root`
- Password: `rootpassword` (update in application.properties)

### Application Users (after loading sample data)
| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | ADMIN |
| john_doe | password123 | USER |
| jane_smith | password123 | USER |

## Verify Setup

```sql
USE librarydb;

-- Check tables
SHOW TABLES;

-- Check data
SELECT COUNT(*) FROM user;
SELECT COUNT(*) FROM book;
SELECT COUNT(*) FROM borrow_record;

-- View currently borrowed books
SELECT * FROM v_currently_borrowed;
```

## Application Configuration

Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/librarydb?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=rootpassword
```

## Troubleshooting

**Error: Access denied**
- Check MySQL username and password

**Error: Unknown database**
- Run schema.sql first

**Error: Table doesn't exist**
- Ensure schema.sql executed successfully

## Next Steps

1. ✅ Run schema.sql
2. ✅ Run sample-data.sql (optional)
3. ✅ Update application.properties
4. ✅ Start Spring Boot application
5. ✅ Test with sample credentials
