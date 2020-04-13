package com.codesquad.todo.exeption;

public class NotFoundData extends BaseException {
    public NotFoundData() {
        super("없는 사용자입니다.");
    }
}
