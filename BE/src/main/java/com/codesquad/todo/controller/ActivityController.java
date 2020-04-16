package com.codesquad.todo.controller;

import com.codesquad.todo.domain.ApiResponse;
import com.codesquad.todo.dto.ActivityDto;
import com.codesquad.todo.service.TodoService;
import com.codesquad.todo.utill.SuccessMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

  @Autowired
  TodoService todoService;

  @GetMapping
  public ResponseEntity<ApiResponse> showActivity() {
    List<ActivityDto> activities = todoService.getAllActivity();
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, activities), HttpStatus.OK);
  }
}
