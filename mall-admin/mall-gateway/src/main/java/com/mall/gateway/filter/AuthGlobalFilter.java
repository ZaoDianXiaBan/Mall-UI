package com.mall.gateway.filter;

import com.mall.common.constant.AuthConstants;
import com.mall.common.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class AuthGlobalFilter implements GlobalFilter, Ordered {

    private static final List<String> WHITE_LIST = List.of(
            "/auth/login",
            "/actuator"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        if (WHITE_LIST.stream().anyMatch(path::startsWith)) {
            return chain.filter(exchange);
        }

        String auth = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (auth == null || !auth.startsWith(AuthConstants.TOKEN_PREFIX)) {
            return unauthorized(exchange.getResponse(), "未登录或 Token 缺失");
        }

        try {
            String token = auth.substring(AuthConstants.TOKEN_PREFIX.length());
            Claims claims = JwtUtils.parse(token);
            ServerHttpRequest request = exchange.getRequest().mutate()
                    .header("X-User-Id", claims.getSubject())
                    .header("X-Username", String.valueOf(claims.get("username")))
                    .build();
            return chain.filter(exchange.mutate().request(request).build());
        } catch (Exception ex) {
            return unauthorized(exchange.getResponse(), "Token 无效或已过期");
        }
    }

    private Mono<Void> unauthorized(ServerHttpResponse response, String message) {
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        byte[] bytes = ("{\"code\":401,\"message\":\"" + message + "\",\"data\":null}")
                .getBytes(StandardCharsets.UTF_8);
        DataBuffer buffer = response.bufferFactory().wrap(bytes);
        return response.writeWith(Mono.just(buffer));
    }

    @Override
    public int getOrder() {
        return -100;
    }
}
