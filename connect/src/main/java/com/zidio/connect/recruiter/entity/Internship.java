package com.zidio.connect.recruiter.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import com.zidio.connect.application.entity.Application;

@Entity
public class Internship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private String skillsRequired;
    private String duration;
    private String stipend;
    private LocalDate deadline;
    private String internshipLogoPath;

    // ✅ New fields
    private LocalDate batchStartDate;
    private LocalDate batchEndDate;
    private String internshipType; // e.g., "Remote", "On-site", "Hybrid"
    private String perks; // e.g., "Certificate, Letter of Recommendation"
    private boolean isPartTimeAllowed;
    private int openings; // Number of positions available
    private String applicationProcess; // e.g., "Resume Screening > Interview"
    private String recruiterProfilePdfUrl;

    @OneToMany(mappedBy = "internship", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recruiter_id")
    private Recruiter recruiter;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSkillsRequired() {
        return skillsRequired;
    }

    public void setSkillsRequired(String skillsRequired) {
        this.skillsRequired = skillsRequired;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getStipend() {
        return stipend;
    }

    public void setStipend(String stipend) {
        this.stipend = stipend;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public LocalDate getBatchStartDate() {
        return batchStartDate;
    }

    public void setBatchStartDate(LocalDate batchStartDate) {
        this.batchStartDate = batchStartDate;
    }

    public LocalDate getBatchEndDate() {
        return batchEndDate;
    }

    public void setBatchEndDate(LocalDate batchEndDate) {
        this.batchEndDate = batchEndDate;
    }

    public String getInternshipType() {
        return internshipType;
    }

    public void setInternshipType(String internshipType) {
        this.internshipType = internshipType;
    }

    public String getPerks() {
        return perks;
    }

    public void setPerks(String perks) {
        this.perks = perks;
    }

    public boolean isPartTimeAllowed() {
        return isPartTimeAllowed;
    }

    public void setPartTimeAllowed(boolean partTimeAllowed) {
        isPartTimeAllowed = partTimeAllowed;
    }

    public int getOpenings() {
        return openings;
    }

    public void setOpenings(int openings) {
        this.openings = openings;
    }

    public String getApplicationProcess() {
        return applicationProcess;
    }

    public void setApplicationProcess(String applicationProcess) {
        this.applicationProcess = applicationProcess;
    }

    public Recruiter getRecruiter() {
        return recruiter;
    }

    public void setRecruiter(Recruiter recruiter) {
        this.recruiter = recruiter;
    }

    public String getRecruiterProfilePdfUrl() {
        return recruiterProfilePdfUrl;
    }

    public void setRecruiterProfilePdfUrl(String recruiterProfilePdfUrl) {
        this.recruiterProfilePdfUrl = recruiterProfilePdfUrl;
    }

    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }

    // Add convenience methods for bi-directional sync (optional but recommended)
    public void addApplication(Application application) {
        applications.add(application);
        application.setInternship(this);
    }

    public void removeApplication(Application application) {
        applications.remove(application);
        application.setInternship(null);
    }

    public String getInternshipLogoPath() {
        return internshipLogoPath;
    }

    public void setInternshipLogoPath(String internshipLogoPath) {
        this.internshipLogoPath = internshipLogoPath;
    }
}
