package com.mall.product.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mall.common.result.R;
import com.mall.product.dto.ProductSaveRequest;
import com.mall.product.dto.StockDeductRequest;
import com.mall.product.entity.PmsProduct;
import com.mall.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/list")
    @SentinelResource("product-page")
    public R<Page<PmsProduct>> page(@RequestParam(defaultValue = "1") long pageNum,
                                    @RequestParam(defaultValue = "10") long pageSize,
                                    @RequestParam(required = false) String keyword) {
        return R.ok(productService.page(pageNum, pageSize, keyword));
    }

    @GetMapping("/{id}")
    public R<PmsProduct> detail(@PathVariable Long id) {
        return R.ok(productService.getById(id));
    }

    @PostMapping
    public R<Long> create(@Valid @RequestBody ProductSaveRequest request) {
        return R.ok(productService.create(request));
    }

    @PutMapping("/{id}")
    public R<Void> update(@PathVariable Long id, @Valid @RequestBody ProductSaveRequest request) {
        productService.update(id, request);
        return R.ok();
    }

    @PostMapping("/stock/deduct")
    public R<Void> deductStock(@Valid @RequestBody StockDeductRequest request) {
        productService.deductStock(request.getProductId(), request.getQuantity());
        return R.ok();
    }
}
