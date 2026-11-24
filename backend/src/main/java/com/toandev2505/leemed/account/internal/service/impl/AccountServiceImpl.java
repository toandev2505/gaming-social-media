package com.toandev2505.leemed.account.internal.service.impl;

import com.toandev2505.leemed.account.entity.Account;
import com.toandev2505.leemed.account.entity.AccountRole;
import com.toandev2505.leemed.account.entity.AccountStatus;
import com.toandev2505.leemed.account.internal.repository.AccountRepository;
import com.toandev2505.leemed.account.internal.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    @Transactional(readOnly = true)
    public Optional<Account> findById(Long id) {
        return accountRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Account> findByUsername(String username) {
        if (username == null || username.isBlank()) {
            return Optional.empty();
        }
        return accountRepository.findByUsername(username.trim());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Account> findByEmail(String email) {
        if (email == null || email.isBlank()) {
            return Optional.empty();
        }
        return accountRepository.findByEmail(email.trim().toLowerCase(Locale.ROOT));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Account> findByPhone(String phone) {
        if (phone == null || phone.isBlank()) {
            return Optional.empty();
        }
        return accountRepository.findByPhone(phone.trim());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Account> findByUsernameOrEmailOrPhone(String identifier) {
        if (identifier == null || identifier.isBlank()) {
            return Optional.empty();
        }
        String trimmed = identifier.trim();
        return accountRepository.findByUsernameOrEmailOrPhone(
                trimmed,
                trimmed.toLowerCase(Locale.ROOT),
                trimmed
        );
    }

    @Override
    public Account createGoogleAccount(String verifiedEmail) {
        String normalizedEmail = verifiedEmail.trim().toLowerCase(Locale.ROOT);

        return accountRepository.findByEmail(normalizedEmail)
                .orElseGet(() -> {
                    String generatedUsername = generateUniqueUsernameFromEmail(normalizedEmail);
                    Account newAccount = Account.builder()
                            .username(generatedUsername)
                            .email(normalizedEmail)
                            .phone(null)
                            .passwordHash(null) // Tài khoản đăng nhập qua Google chưa đặt mật khẩu local
                            .role(AccountRole.USER)
                            .status(AccountStatus.ACTIVE)
                            .build();
                    return accountRepository.save(newAccount);
                });
    }

    @Override
    public Account updateStatus(Long accountId, AccountStatus newStatus) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản với id: " + accountId));
        account.setStatus(newStatus);
        return accountRepository.save(account);
    }

    private String generateUniqueUsernameFromEmail(String email) {
        String prefix = email.substring(0, email.indexOf('@'))
                .replaceAll("[^a-zA-Z0-9._]", "_");
        if (prefix.length() < 3) {
            prefix = "user_" + prefix;
        }
        if (prefix.length() > 35) {
            prefix = prefix.substring(0, 35);
        }

        String candidate = prefix;
        while (accountRepository.existsByUsername(candidate)) {
            String suffix = UUID.randomUUID().toString().substring(0, 6);
            String base = prefix.length() > 28 ? prefix.substring(0, 28) : prefix;
            candidate = base + "_" + suffix;
        }
        return candidate;
    }
}
