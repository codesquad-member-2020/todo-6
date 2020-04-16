package com.codesquad.todo.domain;

import com.codesquad.todo.dto.*;
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

  @Query("SELECT s.* FROM section s, project p WHERE p.id = s.project AND p.id =1")
  List<TempSectionDTO> findAllSectionInProject();

  @Query("SELECT c.id, c.title , c.contents, u.user_id as user " +
      "FROM card c, section s, user u, project p " +
      "WHERE c.section = s.id " +
      "AND s.id = :sectionId " +
      "AND p.id = 1 " +
      "AND c.user = u.id " +
      "ORDER BY c.section_key")
  List<CardDto> findAllCardinEachSection(Long sectionId);

}
