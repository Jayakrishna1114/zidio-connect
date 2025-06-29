package com.zidio.connect.application.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zidio.connect.recruiter.entity.Internship; // Adjust this import path based on your package
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long internshipId;
    private LocalDate appliedDate;
    private String resumeUrl;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String education;
    private Integer graduationYear;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "internshipId", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnoreProperties({ "applications" }) // assuming Internship has a collection called applications
    private Internship internship;

    public enum Status {
        PENDING, SELECTED, REJECTED
    }
}
