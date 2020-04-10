package com.codesquad.todo.utill;

import com.codesquad.todo.domain.User;

public class VerifySection {
  final static int currentProject = 0;

  public static boolean isValidSectionId(User user, int sectionId) {
    int position = sectionId-1;
    if (position < 0) {
      return false;
    }
    int sectionLength = user.getProject().get(currentProject).getSections().size();
    return position < sectionLength;
  }
}
