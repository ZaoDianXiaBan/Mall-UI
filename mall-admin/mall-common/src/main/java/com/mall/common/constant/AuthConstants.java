package com.mall.common.constant;

public final class AuthConstants {

    private AuthConstants() {
    }

    public static final String TOKEN_HEADER = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String JWT_SECRET = "mall-admin-jwt-secret-key-please-change-32bytes";
    public static final long JWT_EXPIRE_MS = 1000L * 60 * 60 * 12;
}
