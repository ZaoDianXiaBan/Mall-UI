package com.mall.order.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("oms_order")
public class OmsOrder {

    @TableId(type = IdType.AUTO)
    private Long id;
    private String orderNo;
    private Long userId;
    private Long productId;
    private String productName;
    private Integer quantity;
    private BigDecimal amount;
    private Integer status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
