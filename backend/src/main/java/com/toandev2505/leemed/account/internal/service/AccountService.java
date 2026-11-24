package com.toandev2505.leemed.account.internal.service;

import com.toandev2505.leemed.account.entity.Account;
import com.toandev2505.leemed.account.entity.AccountStatus;

import java.util.Optional;

public interface AccountService {
    Optional<Account> findById(Long id);

    Optional<Account> findByUsername(String username);

    Optional<Account> findByEmail(String email);

    Optional<Account> findByPhone(String phone);

    Optional<Account> findByUsernameOrEmailOrPhone(String identifier);

    Account createGoogleAccount(String verifiedEmail);

    Account updateStatus(Long accountId, AccountStatus newStatus);
}
