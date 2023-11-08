package com.viajecito.api.config;

import com.viajecito.api.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
        @Autowired
        private UserDetailsService userService;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
                http.headers().frameOptions().sameOrigin();
                http
                        .csrf().disable()
                        .authorizeRequests()
                                .antMatchers("/db.ctd.academy:3306/**").permitAll()
                                .antMatchers("/assets/**").permitAll()
                                .antMatchers("/public/**").permitAll()
                                .antMatchers("/usuario").permitAll()
                                .antMatchers( "/register").authenticated()
                                .and()
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
                                .deleteCookies("JSESSIONID")
                                .and()
                        .exceptionHandling().accessDeniedPage("/error/403");
        }

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception{
                auth.authenticationProvider(daoAuthenticationProvider());
        }
        @Bean
        public DaoAuthenticationProvider daoAuthenticationProvider() {
                DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
                provider.setPasswordEncoder(new BCryptPasswordEncoder());
                provider.setUserDetailsService(userService);
                return provider;
        }
}