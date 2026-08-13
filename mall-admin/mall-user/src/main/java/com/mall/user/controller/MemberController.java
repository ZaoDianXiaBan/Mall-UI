package com.mall.user.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mall.common.result.R;
import com.mall.user.entity.UmsMember;
import com.mall.user.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/members")
    @SentinelResource("user-member-page")
    public R<Page<UmsMember>> page(@RequestParam(defaultValue = "1") long pageNum,
                                   @RequestParam(defaultValue = "10") long pageSize,
                                   @RequestParam(required = false) String keyword) {
        return R.ok(memberService.page(pageNum, pageSize, keyword));
    }

    @GetMapping("/members/{id}")
    public R<UmsMember> detail(@PathVariable Long id) {
        return R.ok(memberService.getById(id));
    }

    @PutMapping("/members/{id}/status")
    public R<Void> updateStatus(@PathVariable Long id, @RequestParam Integer status) {
        memberService.updateStatus(id, status);
        return R.ok();
    }
}
