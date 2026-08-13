package com.mall.product.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mall.common.exception.BusinessException;
import com.mall.product.dto.ProductSaveRequest;
import com.mall.product.entity.PmsProduct;
import com.mall.product.mapper.PmsProductMapper;
import com.mall.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final PmsProductMapper pmsProductMapper;

    @Override
    public Page<PmsProduct> page(long pageNum, long pageSize, String keyword) {
        LambdaQueryWrapper<PmsProduct> wrapper = new LambdaQueryWrapper<>();
        if (StringUtils.hasText(keyword)) {
            wrapper.like(PmsProduct::getName, keyword);
        }
        wrapper.orderByDesc(PmsProduct::getId);
        return pmsProductMapper.selectPage(new Page<>(pageNum, pageSize), wrapper);
    }

    @Override
    public PmsProduct getById(Long id) {
        PmsProduct product = pmsProductMapper.selectById(id);
        if (product == null) {
            throw new BusinessException("商品不存在");
        }
        return product;
    }

    @Override
    public Long create(ProductSaveRequest request) {
        PmsProduct product = new PmsProduct();
        BeanUtils.copyProperties(request, product);
        pmsProductMapper.insert(product);
        return product.getId();
    }

    @Override
    public void update(Long id, ProductSaveRequest request) {
        PmsProduct product = getById(id);
        BeanUtils.copyProperties(request, product);
        product.setId(id);
        pmsProductMapper.updateById(product);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deductStock(Long productId, Integer quantity) {
        int rows = pmsProductMapper.deductStock(productId, quantity);
        if (rows == 0) {
            throw new BusinessException("库存不足或商品不存在");
        }
    }
}
