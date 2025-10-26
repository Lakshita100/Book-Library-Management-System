package com.library.backend.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(JwtConfigProperties.class)
public class ApplicationConfig {
    // This class enables configuration properties binding
    // Additional application-wide configuration beans can be added here
}
