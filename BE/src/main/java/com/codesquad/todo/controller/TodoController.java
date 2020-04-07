package com.codesquad.todo.controller;

import com.codesquad.todo.domain.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todo")
public class TodoController {

  @GetMapping
  public ResponseEntity<ApiResponse> showTodoList() {
    return null;
  }
}
