package com.codesquad.todo.controller;

import com.codesquad.todo.domain.ApiResponse;
import com.codesquad.todo.domain.Card;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CardController {

  @PostMapping("/column/{columnId}/card")
  public ResponseEntity<ApiResponse> createCard(@PathVariable int columnId, Card card) {
    return null;
  }

  @PutMapping("/card/{cardId}")
  public ResponseEntity<ApiResponse> updateCard(@PathVariable int cardId, Card card) {
    return null;
  }

  @GetMapping("/card/{cardId}")
  public ResponseEntity<ApiResponse> moveCard(@RequestParam int source,
                                              @RequestParam int destination,
                                              @PathVariable int cardId)
  {
    return null;
  }

  @DeleteMapping("/card/{cardId}")
  public ResponseEntity<ApiResponse> deleteCard(@PathVariable int cardId) {
    return null;
  }
}
