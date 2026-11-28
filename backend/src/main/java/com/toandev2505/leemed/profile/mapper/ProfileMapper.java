package com.toandev2505.leemed.profile.mapper;

import com.toandev2505.leemed.category.entity.GameCategory;
import com.toandev2505.leemed.profile.dto.ProfileResponse;
import com.toandev2505.leemed.profile.entity.Profile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfileMapper {

    ProfileResponse toResponse(Profile profile);
    ProfileResponse.GameCategorySummary toGameCategorySummary(GameCategory gameCategory);
}
