package com.mall.order.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mall.common.result.R;
import com.mall.order.dto.CreateOrderRequest;
import com.mall.order.entity.OmsOrder;
import com.mall.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/list")
    @SentinelResource("order-page")
    public R<Page<OmsOrder>> page(@RequestParam(defaultValue = "1") long pageNum,
                                  @RequestParam(defaultValue = "10") long pageSize) {
        return R.ok(orderService.page(pageNum, pageSize));
    }

    @GetMapping("/{id}")
    public R<OmsOrder> detail(@PathVariable Long id) {
        return R.ok(orderService.getById(id));
    }

    @PostMapping
    public R<Long> create(@Valid @RequestBody CreateOrderRequest request) {
        return R.ok(orderService.create(request));
    }
}
