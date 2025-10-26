package com.library.backend.service;

import com.library.backend.entity.Book;
import com.library.backend.entity.BorrowRecord;
import com.library.backend.entity.User;
import com.library.backend.repository.BorrowRecordRepository;
import com.library.backend.repository.BookRepository;
import com.library.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BorrowService {
    @Autowired
    private BorrowRecordRepository borrowRecordRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    public BorrowRecord borrowBook(Long userId, Long bookId) {
        User user = userRepository.findById(userId).orElse(null);
        Book book = bookRepository.findById(bookId).orElse(null);
        if (user != null && book != null && book.isAvailable()) {
            book.setAvailable(false);
            bookRepository.save(book);
            BorrowRecord record = new BorrowRecord();
            record.setUser(user);
            record.setBook(book);
            return borrowRecordRepository.save(record);
        }
        return null;
    }

    public boolean returnBook(Long borrowId) {
        BorrowRecord record = borrowRecordRepository.findById(borrowId).orElse(null);
        if (record != null && !record.isReturned()) {
            record.setReturned(true);
            record.setReturnDate(java.time.LocalDate.now());
            record.getBook().setAvailable(true);
            borrowRecordRepository.save(record);
            bookRepository.save(record.getBook());
            return true;
        }
        return false;
    }
}