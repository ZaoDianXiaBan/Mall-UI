package com.mall.auth.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mall.auth.dto.LoginRequest;
import com.mall.auth.dto.LoginResponse;
import com.mall.auth.entity.SysAdmin;
import com.mall.auth.mapper.SysAdminMapper;
import com.mall.common.exception.BusinessException;
import com.mall.common.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final SysAdminMapper sysAdminMapper;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request) {
        SysAdmin admin = sysAdminMapper.selectOne(new LambdaQueryWrapper<SysAdmin>()
                .eq(SysAdmin::getUsername, request.getUsername()));
        if (admin == null
                || admin.getStatus() == null
                || admin.getStatus() != 1
                || !passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new BusinessException("用户名或密码输入错误");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", admin.getUsername());
        claims.put("nickname", admin.getNickname());
        String token = JwtUtils.createToken(String.valueOf(admin.getId()), claims);
        return new LoginResponse(token, admin.getId(), admin.getUsername(), admin.getNickname());
    }
}
