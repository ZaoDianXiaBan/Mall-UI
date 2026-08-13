package com.mall.product.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("pms_product")
public class PmsProduct {

    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private BigDecimal price;
    private Integer stock;
    private Long categoryId;
    private String image;
    private Integer status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
