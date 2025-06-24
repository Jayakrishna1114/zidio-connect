package com.zidio.connect.student.repository;

import com.zidio.connect.student.entity.SavedInternship;
import com.zidio.connect.recruiter.entity.Internship;
import com.zidio.connect.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface SavedInternshipRepository extends JpaRepository<SavedInternship, Long> {
    Optional<SavedInternship> findByStudentAndInternship(Student student, Internship internship);

    List<SavedInternship> findByStudent(Student student);

    void deleteByStudentAndInternship(Student student, Internship internship);
}
