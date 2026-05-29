package com.paintlearning.app.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtworkCreateRequest {

    @NotBlank(message = "图片URI不能为空")
    private String imageUri;

    private String thumbnailUri;

    private List<String> tags;
}