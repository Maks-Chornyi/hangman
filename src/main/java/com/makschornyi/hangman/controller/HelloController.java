package com.makschornyi.hangman.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/hang-man")
public class HelloController {

    @GetMapping
    public String get() {
        return "index";
    }
}
