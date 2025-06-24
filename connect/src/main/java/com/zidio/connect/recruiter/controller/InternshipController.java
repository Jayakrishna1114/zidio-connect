package com.zidio.connect.recruiter.controller;

import com.zidio.connect.recruiter.entity.Internship;
import com.zidio.connect.recruiter.service.InternshipService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/recruiter")
public class InternshipController {

    @Autowired
    private InternshipService internshipService;

    private static final String PDF_DIR = "uploads/recruiter_pdfs/";

    @PostMapping("/{recruiterId}/internships")
    public ResponseEntity<Internship> postInternship(
            @PathVariable Long recruiterId,
            @RequestPart("internship") Internship internship,
            @RequestPart("logo") MultipartFile logoFile) {

        // Construct the expected PDF URL
        String filename = "profile_" + recruiterId + ".pdf";
        String filePath = PDF_DIR + filename;
        String profilePdfUrl = "http://localhost:8081/" + filePath.replace("\\", "/");

        // Validate recruiter profile PDF existence
        Path path = Paths.get(filePath);
        if (!Files.exists(path)) {
            throw new RuntimeException("Recruiter profile PDF not found. Please complete your profile.");
        }

        // Attach PDF URL to internship
        internship.setRecruiterProfilePdfUrl(profilePdfUrl);

        // Save the internship first
        Internship savedInternship = internshipService.createInternship(recruiterId, internship, logoFile);

        // Save logo as uploads/logos/internship_<id>.jpg or .png
        if (logoFile != null && !logoFile.isEmpty()) {
            try {
                String extension = Objects.requireNonNull(logoFile.getOriginalFilename())
                        .endsWith(".png") ? ".png" : ".jpg"; // default to .jpg
                String logoFilename = "internship_" + savedInternship.getId() + extension;
                Path logoPath = Paths.get("uploads/logos", logoFilename);
                Files.createDirectories(logoPath.getParent());
                Files.copy(logoFile.getInputStream(), logoPath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Failed to save internship logo.");
            }
        }

        return ResponseEntity.ok(savedInternship);
    }

    // Recruiter views internships they posted
    @GetMapping("/{recruiterId}/internships")
    public ResponseEntity<List<Internship>> getPosted(@PathVariable Long recruiterId) {
        return ResponseEntity.ok(internshipService.getInternshipsByRecruiter(recruiterId));
    }

    @DeleteMapping("/{recruiterId}/internships/{internshipId}")
    public ResponseEntity<String> deleteInternship(
            @PathVariable Long recruiterId,
            @PathVariable Long internshipId) {

        boolean deleted = internshipService.deleteInternshipByRecruiter(recruiterId, internshipId);
        if (deleted) {
            return ResponseEntity.ok("Internship deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Internship not found or unauthorized access.");
        }
    }

    // Public: View or search internships
    @GetMapping("/public/internships")
    public ResponseEntity<List<Internship>> getOrSearchInternships(
            @RequestParam(required = false, name = "q") String keyword) {
        if (keyword != null && !keyword.isEmpty()) {
            return ResponseEntity.ok(internshipService.searchInternships(keyword));
        } else {
            return ResponseEntity.ok(internshipService.getAllInternships());
        }
    }

    // Public: Search internships
    @GetMapping("/public/internships/search")
    public ResponseEntity<List<Internship>> searchInternships(@RequestParam("q") String keyword) {
        return ResponseEntity.ok(internshipService.searchInternships(keyword));
    }

    @GetMapping("/internship/{internshipId}/logo")
    public ResponseEntity<org.springframework.core.io.Resource> getInternshipLogo(@PathVariable Long internshipId)
            throws IOException {
        String basePath = "uploads/logos/";
        String jpgPath = basePath + "internship_" + internshipId + ".jpg";
        String pngPath = basePath + "internship_" + internshipId + ".png";

        File logoFile = new File(jpgPath);
        if (!logoFile.exists()) {
            logoFile = new File(pngPath);
            if (!logoFile.exists()) {
                return ResponseEntity.notFound().build();
            }
        }

        org.springframework.core.io.Resource resource = new FileSystemResource(logoFile);
        String contentType = Files.probeContentType(logoFile.toPath());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

    // Get internship by ID
    @GetMapping("/public/internships/{id}")
    public ResponseEntity<Internship> getInternship(@PathVariable Long id) {
        return ResponseEntity.ok(internshipService.getInternshipById(id));
    }
}
