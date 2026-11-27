package com.toandev2505.leemed.core.security;

import com.toandev2505.leemed.account.entity.Account;
import lombok.Getter;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class CustomUserDetails implements UserDetails {

    private final Long id;
    private final String username;
    private final String password;
    private final String role;
    private final boolean active;

    public CustomUserDetails(Account account) {
        this.id = account.getId();
        this.username = account.getUsername();
        this.password = account.getPasswordHash();
        this.role = String.valueOf(account.getRole());
        this.active = "ACTIVE".equalsIgnoreCase(String.valueOf(account.getStatus()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String formattedRole = role.toUpperCase().startsWith("ROLE_") ? role.toUpperCase() : "ROLE_" + role.toUpperCase();
        return List.of(new SimpleGrantedAuthority(formattedRole));
    }

    @Override
    public @Nullable String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
