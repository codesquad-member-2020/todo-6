package com.codesquad.todo.domain;

import com.codesquad.todo.dto.ActivityDto;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ActivityRepository extends CrudRepository<Activity, Long> {

  @Query("SELECT a.*, u.user_id FROM activity a LEFT JOIN user u ON a.user = u.id WHERE a.project = 1 ORDER BY a.project_key;")
  List<ActivityDto> getActivities();
}
