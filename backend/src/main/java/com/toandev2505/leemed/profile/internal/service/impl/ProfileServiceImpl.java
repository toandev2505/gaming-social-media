package com.toandev2505.leemed.profile.internal.service.impl;

import com.toandev2505.leemed.category.entity.GameCategory;
import com.toandev2505.leemed.profile.dto.ProfileResponse;
import com.toandev2505.leemed.profile.dto.UpdateProfileRequest;
import com.toandev2505.leemed.profile.entity.Profile;
import com.toandev2505.leemed.profile.internal.repository.GameCategoryRepository;
import com.toandev2505.leemed.profile.internal.repository.ProfileRepository;
import com.toandev2505.leemed.profile.internal.service.ProfileService;
import com.toandev2505.leemed.profile.mapper.ProfileMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private final GameCategoryRepository gameCategoryRepository;
    private final ProfileMapper profileMapper;

    @Override
    @Transactional(readOnly = true)
    public ProfileResponse getMyProfile(Long accountId) {
        Profile profile = profileRepository.findByAccountId(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy hồ sơ người dùng"));
        return profileMapper.toResponse(profile);
    }

    @Override
    @Transactional
    public ProfileResponse updateMyProfile(Long accountId, UpdateProfileRequest request) {
        Profile profile = profileRepository.findByAccountId(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy hồ sơ người dùng"));

        profile.setDisplayName(request.getDisplayName().trim());
        profile.setAvatarUrl(request.getAvatarUrl() != null ? request.getAvatarUrl().trim() : null);
        profile.setBio(request.getBio() != null ? request.getBio().trim() : null);
        profile.setSocialLinks(request.getSocialLinks());

        if (request.getFavoriteGameIds() != null) {
            if (request.getFavoriteGameIds().isEmpty()) {
                profile.getFavoriteGames().clear();
            } else {
                List<GameCategory> games = gameCategoryRepository.findAllById(request.getFavoriteGameIds());
                if (games.size() != request.getFavoriteGameIds().size()) {
                    throw new IllegalArgumentException("Danh sách game yêu thích chứa ID không tồn tại");
                }
                profile.getFavoriteGames().clear();
                profile.getFavoriteGames().addAll(games);
            }
        }

        return profileMapper.toResponse(profileRepository.save(profile));
    }
}
