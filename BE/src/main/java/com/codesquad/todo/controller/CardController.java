package com.codesquad.todo.controller;

import com.codesquad.todo.domain.*;
import com.codesquad.todo.exeption.NotFoundDataException;
import com.codesquad.todo.utill.ErrorMessages;
import com.codesquad.todo.utill.VerifySection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class CardController {

  @Autowired
  UserRepository userRepository;

  @PostMapping("/column/{columnId}/card")
  public ResponseEntity<ApiResponse> createCard(@PathVariable int columnId, @RequestBody @Valid Card card) {
    User user = userRepository.findById(1).get();
    if (!VerifySection.isValidSectionId(user, columnId)) {
      throw new NotFoundDataException(ErrorMessages.NOTFOUND_COLUMN);
    }
    Card createdCard =  user.createCard(columnId, card);
    user.recordActivity("add", createdCard, columnId);
    userRepository.save(user);
    return new ResponseEntity<>(new ApiResponse("SUCCESS", createdCard), HttpStatus.OK);
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
