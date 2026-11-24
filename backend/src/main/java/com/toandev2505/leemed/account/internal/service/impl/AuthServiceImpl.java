package com.toandev2505.leemed.account.internal.service.impl;

import com.toandev2505.leemed.account.dto.GoogleLoginRequest;
import com.toandev2505.leemed.account.dto.LoginRequest;
import com.toandev2505.leemed.account.dto.LoginResponse;
import com.toandev2505.leemed.account.entity.Account;
import com.toandev2505.leemed.account.entity.AccountStatus;
import com.toandev2505.leemed.account.internal.service.AccountService;
import com.toandev2505.leemed.account.internal.service.AuthService;
import com.toandev2505.leemed.account.mapper.AuthMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AccountService accountService;
    private final AuthMapper authMapper;

    @Override
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        String rawIdentifier = request.getIdentifier().trim();
        String method = detectLoginMethod(rawIdentifier);
        String lookupIdentifier = "EMAIL".equals(method)
                ? rawIdentifier.toLowerCase(Locale.ROOT)
                : rawIdentifier;

        Account account = accountService.findByUsernameOrEmailOrPhone(lookupIdentifier)
                .orElseThrow(() -> new IllegalArgumentException("Thông tin đăng nhập không chính xác"));

        if (account.getPasswordHash() == null || !verifyPassword(request.getPassword(), account.getPasswordHash())) {
            throw new IllegalArgumentException("Thông tin đăng nhập không chính xác");
        }

        validateAccountStatus(account);

        return issueLoginResponse(account, method);
    }

    @Override
    public LoginResponse loginWithGoogle(GoogleLoginRequest request) {
        String verifiedGoogleEmail = extractVerifiedEmailFromGoogleToken(request.getIdToken());
        String normalizedEmail = verifiedGoogleEmail.trim().toLowerCase(Locale.ROOT);

        Account account = accountService.findByEmail(normalizedEmail)
                .orElseGet(() -> accountService.createGoogleAccount(normalizedEmail));

        validateAccountStatus(account);

        return issueLoginResponse(account, "GOOGLE");
    }

    private String detectLoginMethod(String identifier) {
        if (identifier.contains("@")) {
            return "EMAIL";
        }
        if (identifier.matches("^\\+?\\d{8,15}$")) {
            return "PHONE";
        }
        return "USERNAME";
    }

    private void validateAccountStatus(Account account) {
        if (account.getStatus() != AccountStatus.ACTIVE) {
            throw new IllegalStateException("Tài khoản hiện không ở trạng thái hoạt động: " + account.getStatus());
        }
    }

    private LoginResponse issueLoginResponse(Account account, String loginMethod) {
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(24);
        String token = UUID.randomUUID().toString();
        return authMapper.toLoginResponse(account, loginMethod, token, expiresAt);
    }

    private boolean verifyPassword(String rawPassword, String passwordHash) {
        return rawPassword != null && rawPassword.equals(passwordHash);
    }

    private String extractVerifiedEmailFromGoogleToken(String idToken) {
        throw new UnsupportedOperationException("Cần cấu hình xác thực Google ID token");
    }
}
