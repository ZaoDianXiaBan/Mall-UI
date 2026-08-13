package com.mall.user.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mall.common.exception.BusinessException;
import com.mall.user.entity.UmsMember;
import com.mall.user.mapper.UmsMemberMapper;
import com.mall.user.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final UmsMemberMapper umsMemberMapper;

    @Override
    public Page<UmsMember> page(long pageNum, long pageSize, String keyword) {
        LambdaQueryWrapper<UmsMember> wrapper = new LambdaQueryWrapper<>();
        if (StringUtils.hasText(keyword)) {
            wrapper.and(w -> w.like(UmsMember::getUsername, keyword)
                    .or().like(UmsMember::getNickname, keyword)
                    .or().like(UmsMember::getPhone, keyword));
        }
        wrapper.orderByDesc(UmsMember::getId);
        return umsMemberMapper.selectPage(new Page<>(pageNum, pageSize), wrapper);
    }

    @Override
    public UmsMember getById(Long id) {
        UmsMember member = umsMemberMapper.selectById(id);
        if (member == null) {
            throw new BusinessException("会员不存在");
        }
        return member;
    }

    @Override
    public void updateStatus(Long id, Integer status) {
        UmsMember member = getById(id);
        member.setStatus(status);
        umsMemberMapper.updateById(member);
    }
}
