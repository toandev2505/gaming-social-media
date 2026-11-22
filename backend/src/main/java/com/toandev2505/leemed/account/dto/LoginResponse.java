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
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginResponse extends BaseDTO {

    private String username;
    private String email;
    private String phone;
    private AccountRole role;
    private AccountStatus status;
    private String loginMethod; // USERNAME, PHONE, EMAIL, GOOGLE
    private String accessToken;
    private LocalDateTime expiresAt;
}
