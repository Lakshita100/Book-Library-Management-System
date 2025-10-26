# Library Management System - Setup Guide

## Complete Integration: Backend + Database + Frontend

This guide will help you connect and run all three components of the Library Management System.

---

## 📋 Prerequisites

- ✅ MySQL Server 8.0+ installed and running
- ✅ Java JDK 21 installed
- ✅ Maven installed
- ✅ Node.js 16+ and npm installed

---

## 🗄️ STEP 1: Database Setup

### 1.1 Start MySQL Server
Ensure MySQL is running on your machine.

### 1.2 Create Database
Navigate to the database folder and run the SQL scripts:

```bash
cd "C:\Users\LAKSHITA JAIN\OneDrive\Desktop\LibraryManagementSystem\library-management-database"

# Option A: Using MySQL Command Line
mysql -u root -p

# Inside MySQL prompt:
source C:/Users/LAKSHITA JAIN/OneDrive/Desktop/LibraryManagementSystem/library-management-database/schema.sql
source C:/Users/LAKSHITA JAIN/OneDrive/Desktop/LibraryManagementSystem/library-management-database/sample-data.sql
exit
```

```bash
# Option B: Using Command Prompt directly
mysql -u root -p < schema.sql
mysql -u root -p < sample-data.sql
```

### 1.3 Verify Database
```sql
mysql -u root -p

USE librarydb;
SHOW TABLES;
SELECT COUNT(*) FROM user;
SELECT COUNT(*) FROM book;
exit
```

Expected output:
- 3 users
- 19 books

---

## 🔧 STEP 2: Backend Setup

### 2.1 Verify application.properties

The file is located at:
`library-management-backend/src/main/resources/application.properties`

Current configuration:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/librarydb?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=#Admin123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
app.jwt.secret=mySecretKeyThatShouldBeAtLeast256BitsLongForHS512Algorithm
app.jwt.expiration=86400000
```

✅ **Password is already set to: `#Admin123`**

### 2.2 Build and Run Backend

```bash
cd "C:\Users\LAKSHITA JAIN\OneDrive\Desktop\LibraryManagementSystem\library-management-backend"

# Build the project
mvn clean install -DskipTests

# Run the application
mvn spring-boot:run
```

Or simply run:
```bash
mvn spring-boot:run
```

### 2.3 Verify Backend is Running

Open browser and check:
- http://localhost:8080/api/books (Should show list of books)

Or use curl/PowerShell:
```powershell
curl http://localhost:8080/api/books
```

Expected: JSON response with book list

---

## 🎨 STEP 3: Frontend Setup

### 3.1 Install Dependencies

```bash
cd "C:\Users\LAKSHITA JAIN\OneDrive\Desktop\LibraryManagementSystem\library-management-frontend"

# Install npm packages
npm install
```

### 3.2 Verify Environment Configuration

Check `.env` file exists with:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

✅ **Already created!**

### 3.3 Start Frontend

```bash
npm start
```

The application will open at: **http://localhost:3000**

---

## 🔗 Architecture Overview

```
┌─────────────────┐
│   MySQL DB      │
│   Port: 3306    │
│   librarydb     │
└────────┬────────┘
         │
         │ JDBC Connection
         │
┌────────▼────────┐
│  Spring Boot    │
│   Backend       │
│   Port: 8080    │
│   REST API      │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│   React         │
│   Frontend      │
│   Port: 3000    │
└─────────────────┘
```

---

## 🔐 API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Books (Public Read, Admin Write)
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `GET /api/books/search?query={query}` - Search books
- `GET /api/books/available` - Get available books
- `POST /api/books` - Add book (Admin)
- `PUT /api/books/{id}` - Update book (Admin)
- `DELETE /api/books/{id}` - Delete book (Admin)

### Borrow (Authenticated)
- `POST /api/borrow/{userId}/{bookId}` - Borrow book
- `PUT /api/borrow/return/{borrowId}` - Return book
- `GET /api/borrow` - Get all borrow records

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `DELETE /api/users/{id}` - Delete user

---

## 🔑 Test Credentials

### Database Credentials
- **Host**: localhost
- **Port**: 3306
- **Database**: librarydb
- **Username**: root
- **Password**: #Admin123

### Application Users (Sample Data)
| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | ADMIN |
| john_doe | password123 | USER |
| jane_smith | password123 | USER |

---

## 🧪 Testing the Integration

### Test 1: Backend API
```bash
# Get all books
curl http://localhost:8080/api/books

# Expected: JSON array of books
```

### Test 2: Login
```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"

# Expected: {"token":"eyJhbGc..."}
```

### Test 3: Frontend Connection
1. Open http://localhost:3000
2. Try to login with `admin` / `admin123`
3. Browse books
4. Try borrowing a book (if user is logged in)

---

## 📂 Project Structure

```
LibraryManagementSystem/
├── library-management-database/
│   ├── schema.sql              # Database schema
│   ├── sample-data.sql         # Sample data
│   └── README.md
│
├── library-management-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/library/backend/
│   │   │   │   ├── config/     # Security, CORS, JWT config
│   │   │   │   ├── controller/ # REST Controllers
│   │   │   │   ├── entity/     # JPA Entities
│   │   │   │   ├── repository/ # Data repositories
│   │   │   │   ├── service/    # Business logic
│   │   │   │   └── security/   # JWT utilities
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw, mvnw.cmd
│
└── library-management-frontend/
    ├── src/
    │   ├── components/         # React components
    │   ├── services/
    │   │   └── api.js         # ✨ API service (NEW)
    │   ├── styles/
    │   ├── App.tsx
    │   └── index.tsx
    ├── .env                   # ✨ Environment config (NEW)
    ├── package.json
    └── README.md
```

---

## 🚀 Quick Start Script

### PowerShell Script (Windows)

Create a file `start-all.ps1`:

```powershell
# Start all services

Write-Host "Starting Library Management System..." -ForegroundColor Cyan

# Start Backend
Write-Host "Starting Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\LAKSHITA JAIN\OneDrive\Desktop\LibraryManagementSystem\library-management-backend'; mvn spring-boot:run"

# Wait for backend to start
Start-Sleep -Seconds 15

# Start Frontend
Write-Host "Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\LAKSHITA JAIN\OneDrive\Desktop\LibraryManagementSystem\library-management-frontend'; npm start"

Write-Host "All services started!" -ForegroundColor Green
Write-Host "Backend: http://localhost:8080" -ForegroundColor White
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
```

Run: `.\start-all.ps1`

---

## 🐛 Troubleshooting

### Backend Issues

**Error: Cannot connect to database**
- Check MySQL is running
- Verify database credentials in `application.properties`
- Check database exists: `mysql -u root -p -e "SHOW DATABASES;"`

**Error: Port 8080 already in use**
- Change port in `application.properties`: `server.port=8081`
- Update `.env` in frontend: `REACT_APP_API_URL=http://localhost:8081/api`

**Error: JWT errors**
- Ensure secret key is at least 256 bits (current one is good)

### Frontend Issues

**Error: Cannot connect to backend**
- Verify backend is running: `curl http://localhost:8080/api/books`
- Check `.env` file has correct API URL
- Clear browser cache and reload

**Error: CORS errors**
- Backend CORS is already configured for `localhost:3000` and `localhost:3001`
- If using different port, update `WebConfig.java`

**Error: Login fails**
- Check username/password are correct
- Verify user exists in database: `SELECT * FROM user;`
- Check browser console for errors

### Database Issues

**Error: Table doesn't exist**
- Run `schema.sql` again
- Check `spring.jpa.hibernate.ddl-auto=update` in application.properties

**Error: Access denied**
- Verify MySQL username and password
- Grant permissions if needed

---

## 📝 Development Workflow

1. **Start MySQL** (always running)
2. **Start Backend** (`mvn spring-boot:run`)
3. **Start Frontend** (`npm start`)
4. **Make changes**
5. **Test** (backend auto-reloads, frontend hot-reloads)

---

## 🎯 Next Steps

1. ✅ Setup database
2. ✅ Start backend
3. ✅ Start frontend
4. ✅ Test login
5. ✅ Test book operations
6. 📱 Start building features!

---

## 📞 Support

- **Backend**: Check logs in terminal where `mvn spring-boot:run` is running
- **Frontend**: Check browser console (F12)
- **Database**: Use MySQL Workbench for visual management

---

**Version**: 1.0  
**Last Updated**: October 24, 2025  
**Status**: Ready for Development ✅
