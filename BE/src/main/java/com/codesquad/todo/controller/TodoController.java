package com.codesquad.todo.controller;

import com.codesquad.todo.domain.ApiResponse;
import com.codesquad.todo.domain.ProjectRepository;
import com.codesquad.todo.dto.*;
import com.codesquad.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/todo")
public class TodoController {
  
  @Autowired
  TodoService todoService;

  @GetMapping
  public ResponseEntity<ApiResponse> getTodo() {
    return new ResponseEntity<>(new ApiResponse("SUCCESS", todoService.getTodo()), HttpStatus.OK);
  }
}
