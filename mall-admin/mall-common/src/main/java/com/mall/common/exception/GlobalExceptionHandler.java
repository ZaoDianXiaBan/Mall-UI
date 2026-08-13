package com.mall.common.exception;

import com.mall.common.result.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public R<Void> handleBusiness(BusinessException ex) {
        return R.fail(ex.getCode(), ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public R<Void> handleValid(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(err -> err.getField() + " " + err.getDefaultMessage())
                .orElse("参数校验失败");
        return R.fail(message);
    }

    @ExceptionHandler(Exception.class)
    public R<Void> handleException(Exception ex) {
        log.error("系统异常", ex);
        return R.fail(ex.getMessage() == null ? "系统异常" : ex.getMessage());
    }
}
