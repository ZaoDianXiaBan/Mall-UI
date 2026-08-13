package com.mall.user.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("ums_member")
public class UmsMember {

    @TableId(type = IdType.AUTO)
    private Long id;
    private String username;
    private String nickname;
    private String phone;
    private Integer status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
