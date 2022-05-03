package com.ssafy.proma.config.auth.jwt;

public interface JwtProperties {
    String SECRET = "proma";
    int JWT_EXPIRATION_TIME = 1000 * 60 * 60 * 10;
    int REF_EXPIRATION_TIME = 1000 * 60 * 60 * 6;
    String TOKEN_PREFIX = "Bearer ";
    String JWT_HEADER_STRING = "Authorization";
    String REF_HEADER_STRING = "Refresh";
}

