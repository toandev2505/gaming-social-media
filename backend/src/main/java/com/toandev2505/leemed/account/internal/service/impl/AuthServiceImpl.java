package com.toandev2505.leemed.account.internal.service.impl;

import com.toandev2505.leemed.account.dto.LoginRequest;
import com.toandev2505.leemed.account.dto.LoginResponse;
import com.toandev2505.leemed.account.internal.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Override
    public LoginResponse login(LoginRequest request) {
        return null;
    }
}
