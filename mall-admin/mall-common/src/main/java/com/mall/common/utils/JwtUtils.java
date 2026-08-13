package com.mall.common.utils;

import com.mall.common.constant.AuthConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

public final class JwtUtils {

    private JwtUtils() {
    }

    private static SecretKey key() {
        return Keys.hmacShaKeyFor(AuthConstants.JWT_SECRET.getBytes(StandardCharsets.UTF_8));
    }

    public static String createToken(String subject, Map<String, Object> claims) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .subject(subject)
                .claims(claims)
                .issuedAt(new Date(now))
                .expiration(new Date(now + AuthConstants.JWT_EXPIRE_MS))
                .signWith(key())
                .compact();
    }

    public static Claims parse(String token) {
        return Jwts.parser()
                .verifyWith(key())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
