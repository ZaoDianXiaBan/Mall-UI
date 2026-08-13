package com.mall.product.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mall.product.dto.ProductSaveRequest;
import com.mall.product.entity.PmsProduct;

public interface ProductService {

    Page<PmsProduct> page(long pageNum, long pageSize, String keyword);

    PmsProduct getById(Long id);

    Long create(ProductSaveRequest request);

    void update(Long id, ProductSaveRequest request);

    void deductStock(Long productId, Integer quantity);
}
