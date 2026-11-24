package com.toandev2505.leemed.account.mapper;

import com.toandev2505.leemed.account.dto.LoginResponse;
import com.toandev2505.leemed.account.entity.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    @Mapping(target = "id", source = "account.id")
    @Mapping(target = "username", source = "account.username")
    @Mapping(target = "email", source = "account.email")
    @Mapping(target = "phone", source = "account.phone")
    @Mapping(target = "role", source = "account.role")
    @Mapping(target = "status", source = "account.status")
    @Mapping(target = "loginMethod", source = "loginMethod")
    @Mapping(target = "accessToken", source = "accessToken")
    @Mapping(target = "expiresAt", source = "expiresAt")
    LoginResponse toLoginResponse(Account account, String loginMethod, String accessToken, LocalDateTime expiresAt);
}
