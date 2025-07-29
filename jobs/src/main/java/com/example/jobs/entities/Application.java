    package com.example.jobs.entities;

    import com.example.jobs.enums.ApplicationStatus;
    import jakarta.persistence.*;

    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.time.LocalDateTime;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor

    @Entity
    @Table(name = "applications")
    public class Application {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @ManyToOne
        @JoinColumn(name = "job_id")
        private JobPosting jobPosting;

        @ManyToOne
        @JoinColumn(name = "candidate_id")
        private Candidate candidate;

        @Column(name = "cover_letter")
        private String coverLetter;

        private String status;

        @Column(name = "applied_at")
        private LocalDateTime appliedAt;

    }
