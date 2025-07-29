package com.example.jobs.services;


import com.example.jobs.dtos.AppResponseDto;
import com.example.jobs.dtos.CreateApplicationRequestDto;
import com.example.jobs.dtos.PaginatedAppResponseDto;
import com.example.jobs.dtos.UpdateAppRequestDto;
import com.example.jobs.entities.Application;
import com.example.jobs.repositories.AppJpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppService {

    private final AppJpaRepository appJpaRepository;

    public AppService(AppJpaRepository appJpaRepository) {
        this.appJpaRepository = appJpaRepository;
    }

    private AppResponseDto convertToDto(Application app) {
        return new AppResponseDto(
                    app.getId(),
                app.getJobPosting() != null ? app.getJobPosting().getId() : null,
                app.getCandidate() != null ? app.getCandidate().getId() : null,
                    app.getCoverLetter(),
                    app.getStatus(),
                    app.getAppliedAt()
        );
    }

    public List<AppResponseDto> getAllApps() {
        List<Application> apps = this.appJpaRepository.findAll();
        return apps.stream()
                .map(this:: convertToDto)
                .collect(Collectors.toList());
    }

    public PaginatedAppResponseDto getAllAppsByPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Application> appPage =this.appJpaRepository.findAll( pageable);
        List<AppResponseDto> appDtos = appPage.getContent().stream()
                             .map(this::convertToDto)
                    .collect(Collectors.toList());

        return PaginatedAppResponseDto.builder()
                .data(appDtos)
                .pageNumber(appPage.getNumber())
                .pageSize(appPage.getSize())
                .totalRecords(appPage.getTotalElements())
                .totalPages(appPage.getTotalPages())
                .hasNext(appPage.hasNext())
                .hasPrevious(appPage.hasPrevious())
                .build();

    }

    public AppResponseDto getAppById(Integer id) {
        Application app = this.appJpaRepository.findById(id).orElseThrow();
        return convertToDto(app);
    }

    public AppResponseDto createApplication(CreateApplicationRequestDto createApplicationRequestDto) {

        Application  app = new Application();

        app.setJobPosting(createApplicationRequestDto.getJobPosting());
        app.setCandidate(createApplicationRequestDto.getCandidate());
        app.setCoverLetter(createApplicationRequestDto.getCoverLetter());
        app.setStatus(createApplicationRequestDto.getStatus());
        app.setAppliedAt(createApplicationRequestDto.getAppliedAt());

        Application createApplication= this.appJpaRepository.save(app);
        return convertToDto(createApplication);
    }

    public AppResponseDto updateApplication(Integer id, UpdateAppRequestDto  application) {
        Application existingApp = this.appJpaRepository.findById(id).orElseThrow();

        existingApp.setJobPosting(application.getJobPosting());
        existingApp.setCandidate(application.getCandidate());
        existingApp.setCoverLetter(application.getCoverLetter());
        existingApp.setStatus(application.getStatus());
        existingApp.setAppliedAt(application.getAppliedAt());
        Application updateApplication = this.appJpaRepository.save(existingApp);
        return convertToDto(updateApplication);
    }
    public void deleteApplication(Integer id) {
        this.appJpaRepository.findById(id).orElseThrow();
        this.appJpaRepository.deleteById(id);
    }


}
