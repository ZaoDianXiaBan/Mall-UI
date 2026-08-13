package com.mall.order.feign;

import com.mall.common.result.R;
import com.mall.order.feign.dto.ProductDTO;
import com.mall.order.feign.dto.StockDeductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "mall-product", path = "/product")
public interface ProductFeignClient {

    @GetMapping("/{id}")
    R<ProductDTO> detail(@PathVariable("id") Long id);

    @PostMapping("/stock/deduct")
    R<Void> deductStock(@RequestBody StockDeductDTO request);
}
