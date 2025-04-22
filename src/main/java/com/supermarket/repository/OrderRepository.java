package com.supermarket.repository;

import com.supermarket.model.Customer;
import com.supermarket.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomer(Customer customer);
    List<Order> findByOrderDateBetween(Date startDate, Date endDate);
    List<Order> findByStatus(String status);
}