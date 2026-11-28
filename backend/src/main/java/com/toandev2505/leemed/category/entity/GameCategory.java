package com.toandev2505.leemed.category.entity;

import com.toandev2505.leemed.core.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Entity
@Table(name = "categories")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GameCategory extends BaseEntity {

    @Column(name = "name", nullable = false, unique = true, length = 100)
    String name;

    @Column(name = "slug", nullable = false, unique = true, length = 120)
    String slug;

    @Column(name = "icon_url", length = 500)
    String iconUrl;

    @Column(name = "status", nullable = false)
    @Builder.Default
    boolean status = true;
}
