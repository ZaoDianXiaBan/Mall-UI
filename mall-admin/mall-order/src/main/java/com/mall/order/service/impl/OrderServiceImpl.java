package com.mall.order.service.impl;

import cn.hutool.core.util.IdUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mall.common.exception.BusinessException;
import com.mall.common.result.R;
import com.mall.order.dto.CreateOrderRequest;
import com.mall.order.entity.OmsOrder;
import com.mall.order.feign.ProductFeignClient;
import com.mall.order.feign.dto.ProductDTO;
import com.mall.order.feign.dto.StockDeductDTO;
import com.mall.order.mapper.OmsOrderMapper;
import com.mall.order.service.OrderService;
import io.seata.spring.annotation.GlobalTransactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OmsOrderMapper omsOrderMapper;
    private final ProductFeignClient productFeignClient;

    @Override
    public Page<OmsOrder> page(long pageNum, long pageSize) {
        return omsOrderMapper.selectPage(new Page<>(pageNum, pageSize), null);
    }

    @Override
    public OmsOrder getById(Long id) {
        OmsOrder order = omsOrderMapper.selectById(id);
        if (order == null) {
            throw new BusinessException("订单不存在");
        }
        return order;
    }

    /**
     * 分布式事务示例：创建订单 + Feign 扣减库存，失败整体回滚（Seata AT）
     */
    @Override
    @GlobalTransactional(name = "create-order-tx", rollbackFor = Exception.class)
    public Long create(CreateOrderRequest request) {
        R<ProductDTO> productRes = productFeignClient.detail(request.getProductId());
        if (productRes == null || productRes.getCode() != 0 || productRes.getData() == null) {
            throw new BusinessException(productRes == null ? "商品服务不可用" : productRes.getMessage());
        }
        ProductDTO product = productRes.getData();
        if (product.getStatus() == null || product.getStatus() != 1) {
            throw new BusinessException("商品已下架");
        }

        R<Void> deductRes = productFeignClient.deductStock(
                new StockDeductDTO(request.getProductId(), request.getQuantity()));
        if (deductRes == null || deductRes.getCode() != 0) {
            throw new BusinessException(deductRes == null ? "扣减库存失败" : deductRes.getMessage());
        }

        BigDecimal amount = product.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));
        OmsOrder order = new OmsOrder();
        order.setOrderNo(IdUtil.getSnowflakeNextIdStr());
        order.setUserId(request.getUserId());
        order.setProductId(product.getId());
        order.setProductName(product.getName());
        order.setQuantity(request.getQuantity());
        order.setAmount(amount);
        order.setStatus(0);
        omsOrderMapper.insert(order);
        return order.getId();
    }
}
