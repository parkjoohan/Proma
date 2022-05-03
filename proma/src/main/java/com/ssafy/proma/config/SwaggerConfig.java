package com.ssafy.proma.config;

import com.ssafy.proma.config.auth.jwt.JwtProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

  //http://localhost:8080/swagger-ui.html#/

  @Bean
  public Docket swaggerApi() {
    return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(swaggerInfo())
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.ssafy.proma.controller"))
            .paths(PathSelectors.any())
            .build()
            .useDefaultResponseMessages(false); // 기본으로 세팅되는 200,401,403,404 메시지를 표시 하지 않음
  }

  private ApiInfo swaggerInfo() {
    return new ApiInfoBuilder().title("Proma Swagger")
            .description("Proma API")
            .contact(new Contact("SSAFY", "https://edu.ssafy.com", "ssafy@ssafy.com"))
            .license("SSAFY License")
            .licenseUrl("ssafy@ssafy.com").version("1.0")
            .build();
  }

  private ApiKey apiKey() {
    return new ApiKey(JwtProperties.JWT_HEADER_STRING, JwtProperties.JWT_HEADER_STRING, "header");
  }

  private SecurityContext securityContext() {
    return springfox
            .documentation
            .spi.service
            .contexts
            .SecurityContext
            .builder()
            .securityReferences(defaultAuth()).forPaths(PathSelectors.any()).build();
  }

  List<SecurityReference> defaultAuth() {
    AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
    AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
    authorizationScopes[0] = authorizationScope;
    return Arrays.asList(new SecurityReference(JwtProperties.JWT_HEADER_STRING, authorizationScopes));
  }
}
