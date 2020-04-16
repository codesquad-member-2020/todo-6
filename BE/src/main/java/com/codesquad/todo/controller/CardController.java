package com.codesquad.todo.controller;

import com.codesquad.todo.domain.*;
import com.codesquad.todo.dto.CardDto;
import com.codesquad.todo.service.TodoService;
import com.codesquad.todo.utill.SuccessMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/column/{columnId}")
public class CardController {

  @Autowired
  TodoService todoService;

  @PostMapping("/card")
  public ResponseEntity<ApiResponse> createCard(@PathVariable Long columnId, @RequestBody @Valid Card card, @RequestAttribute User user) {
    CardDto newCard = todoService.createCard(columnId, card, user);
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, newCard), HttpStatus.OK);
  }

  @PutMapping("/card/{cardId}")
  public ResponseEntity<ApiResponse> updateCard(@PathVariable Long columnId, @PathVariable Long cardId,
                                                @RequestBody @Valid Card card, @RequestAttribute User user) {
    todoService.updateCard(columnId, cardId, card, user);
    return ResponseEntity.ok(new ApiResponse(SuccessMessages.SUCCESS, SuccessMessages.SUCCESS_UPDATE));
  }

  @PatchMapping("/card/{columnKey}")
  public ResponseEntity<ApiResponse> moveCard(@PathVariable Long columnId,
                                              @PathVariable int columnKey,
                                              @RequestParam Long destination,
                                              @RequestParam int position,
                                              @RequestAttribute User user)
  {
    todoService.moveCard(columnId,columnKey,destination,position,user);
    return ResponseEntity.ok(new ApiResponse(SuccessMessages.SUCCESS, SuccessMessages.SUCCESS_MOVE));
  }

  @DeleteMapping("/card/{cardId}")
  public ResponseEntity<ApiResponse> deleteCard(@PathVariable Long columnId, @PathVariable Long cardId, @RequestAttribute User user) {
    todoService.deleteCard(columnId, cardId, user);
    return new ResponseEntity<>(new ApiResponse(SuccessMessages.SUCCESS, SuccessMessages.SUCCESS_DELETE), HttpStatus.OK);
  }
}
