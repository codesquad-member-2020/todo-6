package com.codesquad.todo.controller;

import com.codesquad.todo.domain.ApiResponse;
import com.codesquad.todo.domain.Project;
import com.codesquad.todo.domain.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todo")
public class TodoController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public ResponseEntity<ApiResponse> todo() {
        Project project = projectRepository.findById(1L).get();
        return ResponseEntity.ok(new ApiResponse("성공",project));
    }

}
