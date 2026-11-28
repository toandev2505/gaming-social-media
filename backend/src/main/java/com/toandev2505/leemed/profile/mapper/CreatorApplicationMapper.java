package com.toandev2505.leemed.profile.mapper;

import com.toandev2505.leemed.profile.entity.ApplicationStatus;
import com.toandev2505.leemed.profile.entity.CreatorApplication;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CreatorApplicationMapper {

//    @Mapping(target = "accountId", source = "accountId")
//    @Mapping(target = "status", source = "status")
//    @Mapping(target = "desiredChannelName", expression = "java(request.getDesiredChannelName().trim())")
//    @Mapping(target = "desiredHandle", expression = "java(request.getDesiredHandle().trim().toLowerCase(java.util.Locale.ROOT))")
//    @Mapping(target = "channelDescription", expression = "java(request.getChannelDescription() != null ? request.getChannelDescription().trim() : null)")
//    @Mapping(target = "fullName", expression = "java(request.getFullName().trim())")
//    @Mapping(target = "contactPhone", expression = "java(request.getContactPhone() != null ? request.getContactPhone().trim() : null)")
//    CreatorApplication toEntity(SubmitCreatorApplicationRequest request, Long accountId, ApplicationStatus status);
//
//    CreatorApplicationResponse toResponse(CreatorApplication application);
}
