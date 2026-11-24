package com.toandev2505.leemed.account.internal.repository;

import com.toandev2505.leemed.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUsername(String username);

    Optional<Account> findByEmail(String email);

    Optional<Account> findByPhone(String phone);

    boolean existsByUsername(String username);

    @Query("""
            SELECT a FROM Account a
            WHERE a.username = :username
               OR LOWER(a.email) = :email
               OR a.phone = :phone
            """)
    Optional<Account> findByUsernameOrEmailOrPhone(
            @Param("username") String username,
            @Param("email") String email,
            @Param("phone") String phone
    );
}
