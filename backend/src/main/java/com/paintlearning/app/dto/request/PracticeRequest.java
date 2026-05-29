package com.paintlearning.app.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PracticeRequest {

    @NotBlank(message = "画作ID不能为空")
    private String artworkId;

    @NotBlank(message = "练习图片Base64不能为空")
    private String practiceImageBase64;

    private String language = "zh";
}