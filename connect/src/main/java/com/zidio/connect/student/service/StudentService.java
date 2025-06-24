package com.zidio.connect.student.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zidio.connect.recruiter.entity.Internship;
import com.zidio.connect.recruiter.repository.InternshipRepository;
import com.zidio.connect.student.entity.SavedInternship;
import com.zidio.connect.student.entity.Student;
import com.zidio.connect.student.repository.SavedInternshipRepository;
import com.zidio.connect.student.repository.StudentRepository;

@Service
public class StudentService {
    @Autowired
    private SavedInternshipRepository savedInternshipRepository;

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private StudentRepository studentRepository;

    public void saveInternship(Long studentId, Long internshipId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        boolean alreadySaved = savedInternshipRepository.findByStudentAndInternship(student, internship).isPresent();
        if (alreadySaved) {
            throw new RuntimeException("Internship already saved");
        }

        SavedInternship saved = new SavedInternship();
        saved.setStudent(student);
        saved.setInternship(internship);
        savedInternshipRepository.save(saved);
    }

    @Transactional
    public void unsaveInternship(Long studentId, Long internshipId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        savedInternshipRepository.deleteByStudentAndInternship(student, internship);
    }

    public List<SavedInternship> getSavedInternships(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return savedInternshipRepository.findByStudent(student);
    }

}
