package com.library.backend.repository;

import com.library.backend.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {
    List<BorrowRecord> findByUserIdAndReturned(Long userId, boolean returned);
}