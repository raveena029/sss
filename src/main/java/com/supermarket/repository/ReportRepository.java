package com.supermarket.repository;

import com.supermarket.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByGenerationDateBetween(Date startDate, Date endDate);
    List<Report> findByTitle(String title);
}