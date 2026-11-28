package com.toandev2505.leemed.profile.internal.service;

import com.toandev2505.leemed.profile.dto.ProfileResponse;
import com.toandev2505.leemed.profile.dto.UpdateProfileRequest;

public interface ProfileService {

    ProfileResponse getMyProfile(Long accountId);
    ProfileResponse updateMyProfile(Long accountId, UpdateProfileRequest request);
}
