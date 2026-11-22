package com.toandev2505.leemed.account.internal.service;

import com.toandev2505.leemed.account.dto.LoginRequest;
import com.toandev2505.leemed.account.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);
}
