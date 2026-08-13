package com.mall.product.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductSaveRequest {

    @NotBlank
    private String name;

    @NotNull
    private BigDecimal price;

    @NotNull
    @Min(0)
    private Integer stock;

    private Long categoryId;
    private String image;
    private Integer status = 1;
}
