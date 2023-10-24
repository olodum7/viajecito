package com.viajecito.api.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
        /*@Autowired
        private AppUserService userService;

        @Autowired
        private BCryptPasswordEncoder passwordEncoder;*/

        @Override
        protected void configure(HttpSecurity http) throws Exception {
                http.headers().frameOptions().sameOrigin();
                http
                        .csrf()
                        .disable()
                        .authorizeRequests()

                        //H2-Console
                        .antMatchers("/db.ctd.academy:3306/**").permitAll()

                        .antMatchers("/").permitAll()
                        //.antMatchers("/index").authenticated()
                        //.antMatchers("/login").hasAnyRole("ADMIN", "USER")
                        //.antMatchers("/odontologos/**").hasRole("ADMIN")
                        .antMatchers("/assets/**").permitAll();
                        //.anyRequest().;
                        /*.and()
                                .formLogin()
                                .permitAll()
                                .loginPage("/login")
                                .defaultSuccessUrl("/index",true)
                                .failureUrl("/login?error=true")
                        .and()
                                .logout()
                                .logoutSuccessUrl("/login?logout=true")
                                .permitAll()
                                .invalidateHttpSession(true)
                                .deleteCookies("JSESSIONID");*/
        }
/*
        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception{
                auth.authenticationProvider(daoAuthenticationProvider());
        }
        @Bean
        public DaoAuthenticationProvider daoAuthenticationProvider(){
                DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
                provider.setPasswordEncoder(passwordEncoder);
                provider.setUserDetailsService(userService);
                return provider;
        }*/
}