package com.mall.order.feign.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockDeductDTO {

    private Long productId;
    private Integer quantity;
}
