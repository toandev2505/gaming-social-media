package com.toandev2505.leemed.profile.internal.controller;

import com.toandev2505.leemed.core.security.CustomUserDetails;
import com.toandev2505.leemed.profile.dto.ProfileResponse;
import com.toandev2505.leemed.profile.dto.UpdateProfileRequest;
import com.toandev2505.leemed.profile.internal.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getMyProfile(
            @AuthenticationPrincipal CustomUserDetails currentUser
    ) {
        return ResponseEntity.ok(profileService.getMyProfile(currentUser.getId()));
    }

    @PutMapping("/me")
    public ResponseEntity<ProfileResponse> updateMyProfile(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        return ResponseEntity.ok(profileService.updateMyProfile(currentUser.getId(), request));
    }
}
