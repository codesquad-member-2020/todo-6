package com.codesquad.todo.controller;

import com.codesquad.todo.domain.ApiResponse;
import com.codesquad.todo.domain.User;
import com.codesquad.todo.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todo")
public class TodoController {

  @Autowired
  private UserRepository userRepository;

  @GetMapping
  public ResponseEntity<ApiResponse> showTodoList() {
    User user = userRepository.findById(1).get();
    ApiResponse apiResponse = new ApiResponse("SUCCESS",user);
    return ResponseEntity.ok(apiResponse);
  }
}
