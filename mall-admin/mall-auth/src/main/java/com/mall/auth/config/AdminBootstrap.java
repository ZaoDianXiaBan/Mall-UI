package com.mall.auth.config;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mall.auth.entity.SysAdmin;
import com.mall.auth.mapper.SysAdminMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminBootstrap implements CommandLineRunner {

    private final SysAdminMapper sysAdminMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        SysAdmin exist = sysAdminMapper.selectOne(new LambdaQueryWrapper<SysAdmin>()
                .eq(SysAdmin::getUsername, "admin"));
        if (exist == null) {
            SysAdmin admin = new SysAdmin();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setNickname("超级管理员");
            admin.setStatus(1);
            sysAdminMapper.insert(admin);
            return;
        }
        // 保证本地演示账号密码始终可用
        exist.setPassword(passwordEncoder.encode("admin123"));
        exist.setStatus(1);
        sysAdminMapper.updateById(exist);
    }
}
