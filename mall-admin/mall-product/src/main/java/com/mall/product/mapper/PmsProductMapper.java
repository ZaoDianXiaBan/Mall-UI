package com.mall.product.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mall.product.entity.PmsProduct;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

public interface PmsProductMapper extends BaseMapper<PmsProduct> {

    @Update("UPDATE pms_product SET stock = stock - #{quantity} WHERE id = #{productId} AND stock >= #{quantity}")
    int deductStock(@Param("productId") Long productId, @Param("quantity") Integer quantity);
}
