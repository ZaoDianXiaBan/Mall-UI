package com.mall.order.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mall.order.dto.CreateOrderRequest;
import com.mall.order.entity.OmsOrder;

public interface OrderService {

    Page<OmsOrder> page(long pageNum, long pageSize);

    OmsOrder getById(Long id);

    Long create(CreateOrderRequest request);
}
