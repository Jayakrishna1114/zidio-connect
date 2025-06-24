package com.zidio.connect.recruiter.service;

import com.zidio.connect.application.repository.ApplicationRepository;
import com.zidio.connect.recruiter.entity.Internship;
import com.zidio.connect.recruiter.entity.Recruiter;
import com.zidio.connect.recruiter.repository.InternshipRepository;
import com.zidio.connect.recruiter.repository.RecruiterRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class InternshipService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private RecruiterRepository recruiterRepository;
    @Autowired
    private ApplicationRepository applicationRepository;

    public Internship createInternship(Long recruiterId, Internship internship, MultipartFile logoFile) {
        Recruiter recruiter = recruiterRepository.findById(recruiterId)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));

        // Associate the recruiter with the internship
        internship.setRecruiter(recruiter);
        if (logoFile != null && !logoFile.isEmpty()) {
            String logoFileName = System.currentTimeMillis() + "_" + logoFile.getOriginalFilename();
            String uploadDir = "uploads/logos/";

            try {
                File dir = new File(uploadDir);
                if (!dir.exists())
                    dir.mkdirs();

                Path filePath = Paths.get(uploadDir, logoFileName);
                Files.copy(logoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                String fileUrl = "http://localhost:8080/" + uploadDir + logoFileName; // Adjust domain as needed
                internship.setInternshipLogoPath(fileUrl);

            } catch (IOException e) {
                throw new RuntimeException("Failed to store file", e);
            }
        }

        // Save the internship
        return internshipRepository.save(internship);
    }

    @Transactional
    public boolean deleteInternship(Long recruiterId, Long internshipId) {
        Optional<Internship> internshipOpt = internshipRepository.findById(internshipId);
        if (internshipOpt.isPresent()) {
            Internship internship = internshipOpt.get();
            if (internship.getRecruiter().getId().equals(recruiterId)) {

                // Delete dependent applications first
                applicationRepository.deleteByInternshipId(internshipId);

                // Now delete the internship
                internshipRepository.delete(internship);
                return true;
            }
        }
        return false;
    }

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public List<Internship> getInternshipsByRecruiter(Long recruiterId) {
        return internshipRepository.findByRecruiterId(recruiterId);
    }

    public List<Internship> searchInternships(String keyword) {
        return internshipRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public Internship getInternshipById(Long id) {
        return internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    public boolean deleteInternshipByRecruiter(Long recruiterId, Long internshipId) {
        Optional<Internship> internshipOpt = internshipRepository.findById(internshipId);
        if (internshipOpt.isPresent()) {
            Internship internship = internshipOpt.get();
            if (internship.getRecruiter().getId().equals(recruiterId)) {
                internshipRepository.delete(internship);
                return true;
            }
        }
        return false;
    }

}
