package com.mall.user.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mall.user.entity.UmsMember;

public interface MemberService {

    Page<UmsMember> page(long pageNum, long pageSize, String keyword);

    UmsMember getById(Long id);

    void updateStatus(Long id, Integer status);
}
