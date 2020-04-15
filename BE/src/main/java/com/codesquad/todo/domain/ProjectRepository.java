package com.codesquad.todo.domain;

import com.codesquad.todo.dto.ActivityDto;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProjectRepository extends CrudRepository<Project, Long> {

  @Query("SELECT a.id, a.action, a.source, a.destination, a.created_at, a.card, u.user_id " +
      "From activity a, user u, project p " +
      "WHERE a.project = p.id " +
      "AND a.user = u.id " +
      "AND p.id = :projectId " +
      "ORDER BY a.created_at DESC")
  List<ActivityDto> getAllActivity(Long projectId);

}
