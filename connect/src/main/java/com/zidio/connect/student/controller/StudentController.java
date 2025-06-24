package com.zidio.connect.student.controller;

import com.zidio.connect.student.entity.SavedInternship;
import com.zidio.connect.student.entity.Student;
import com.zidio.connect.student.repository.StudentRepository;
import com.zidio.connect.student.service.ResumeService;
import com.zidio.connect.student.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private ResumeService resumeService;

    private static final String IMAGE_DIR = "uploads/profile_images/";

    @PostMapping(value = "/{id}/setup-profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Student> setupProfile(
            @PathVariable Long id,
            @RequestPart("student") Student updated,
            @RequestPart("profileImage") MultipartFile profileImage) throws IOException {

        Student student = studentRepo.findById(id).orElseThrow();

        // Save image to disk
        String filename = UUID.randomUUID().toString() + "_" + profileImage.getOriginalFilename();
        Path imagePath = Paths.get(IMAGE_DIR + filename);
        Files.createDirectories(imagePath.getParent());
        Files.write(imagePath, profileImage.getBytes());

        // Update student fields
        student.setBio(updated.getBio());
        student.setSkills(updated.getSkills());
        student.setEducation(updated.getEducation());
        student.setProjects(updated.getProjects());
        student.setCertifications(updated.getCertifications());
        student.setGithubProfile(updated.getGithubProfile());
        student.setLinkedinProfile(updated.getLinkedinProfile());
        student.setPhoneNumber(updated.getPhoneNumber());
        student.setGraduationYear(updated.getGraduationYear());
        student.setUniversity(updated.getUniversity());
        String publicUrl = "http://localhost:8081/" + imagePath.toString().replace("\\", "/");
        student.setProfileImagePath(publicUrl);
        student.setProfileCompleted(true);

        // Generate resume
        String resumePath = resumeService.generateResume(student);
        student.setResumePath(resumePath);

        return ResponseEntity.ok(studentRepo.save(student));
    }

    @Autowired
    private StudentService studentService;

    @PostMapping("/{studentId}/internships/{internshipId}/save")
    public ResponseEntity<String> saveInternship(
            @PathVariable Long studentId,
            @PathVariable Long internshipId) {
        studentService.saveInternship(studentId, internshipId);
        return ResponseEntity.ok("Internship saved successfully");
    }

    @DeleteMapping("/{studentId}/internships/{internshipId}/unsave")
    public ResponseEntity<String> unsaveInternship(
            @PathVariable Long studentId,
            @PathVariable Long internshipId) {
        studentService.unsaveInternship(studentId, internshipId);
        return ResponseEntity.ok("Internship unsaved successfully");
    }

    @GetMapping("/{studentId}/saved-internships")
    public ResponseEntity<List<SavedInternship>> getSavedInternships(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getSavedInternships(studentId));
    }

}
