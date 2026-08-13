package com.mall.auth.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.mall.auth.dto.LoginRequest;
import com.mall.auth.dto.LoginResponse;
import com.mall.auth.service.AuthService;
import com.mall.common.result.R;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @SentinelResource(value = "auth-login")
    public R<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return R.ok(authService.login(request));
    }
}
