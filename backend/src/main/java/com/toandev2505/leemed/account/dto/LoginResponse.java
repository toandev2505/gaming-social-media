package com.toandev2505.leemed.account.dto;

import com.toandev2505.leemed.account.entity.AccountRole;
import com.toandev2505.leemed.account.entity.AccountStatus;
import com.toandev2505.leemed.core.dto.BaseDTO;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;


@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginResponse extends BaseDTO {

    String username;
    String email;
    String phone;
    AccountRole role;
    AccountStatus status;
    String loginMethod; // USERNAME, PHONE, EMAIL, GOOGLE
    String accessToken;
    LocalDateTime expiresAt;
}
