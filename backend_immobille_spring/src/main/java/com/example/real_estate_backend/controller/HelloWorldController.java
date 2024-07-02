package com.example.real_estate_backend.controller;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("hello")
public class HelloWorldController {
    @GetMapping("world")
    public String helloWorld() {
        return "Hello World";
    }
    @GetMapping("/{name}")
    public String helloPath(@PathVariable String name) {
        return "Hello " + name + " World";
    }
    @GetMapping("")
    public String helloParam(@RequestParam String name) {
        return "Hello " + name + " World";
    }
}
