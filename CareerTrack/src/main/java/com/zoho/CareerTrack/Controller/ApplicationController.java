package com.zoho.CareerTrack.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zoho.CareerTrack.Dto.ApplicationDto;
import com.zoho.CareerTrack.Service.ApplicationService;

import jakarta.validation.Valid;


@RestController 
@RequestMapping("/api/application")
public class ApplicationController {
    @Autowired
    public  ApplicationService applicationService;
    @PostMapping("/create")
    public ResponseEntity<ApplicationDto> createApplication(@Valid @RequestBody ApplicationDto applicationdto){
    ApplicationDto createdApplication = applicationService.createApplication(applicationdto);
    return new ResponseEntity<>(createdApplication,HttpStatus.CREATED);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<ApplicationDto> getApplicationByid(@PathVariable Integer id){
    ApplicationDto applicationDto =applicationService.getapplicationByid(id);
    return new ResponseEntity<>(applicationDto,HttpStatus.OK);
    }
    @GetMapping("/get")
    public ResponseEntity<Page<ApplicationDto>>getallapplication(Pageable pageable){
        Page<ApplicationDto> applications=applicationService.getallApplication(pageable);
        return new ResponseEntity<>(applications,HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<ApplicationDto> updateApplication(@PathVariable Integer id,@Valid  @RequestBody ApplicationDto applicationDto ) {
    ApplicationDto updatedapplicationDto = applicationService.updateApplication(id,applicationDto);
    return new ResponseEntity<>(updatedapplicationDto,HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
   public ResponseEntity<String> deleteApplication(@PathVariable Integer id){
    applicationService.deleteApplicationByid(id);
    return ResponseEntity.ok("Application Deleted Successfully");
   }
   @GetMapping("/filter")
   public ResponseEntity<Page<ApplicationDto>>filterBystatus(@RequestParam String status,Pageable pageable){
    Page<ApplicationDto>applications=applicationService.filterByStatus(status,pageable);
    return new ResponseEntity<>(
        applications,
        HttpStatus.OK
    );
   }
   @GetMapping("/search")
   public ResponseEntity<Page<ApplicationDto>>searchApplication( @RequestParam String companyName,Pageable pageable){
    Page<ApplicationDto>applications=applicationService.searchApplication(companyName,pageable);
    return new ResponseEntity<>(
        applications,
        HttpStatus.OK
    );
   }
   @GetMapping ("/page")
   public ResponseEntity<Page<ApplicationDto>>getApplications(Pageable pageable){
    Page<ApplicationDto>applications=applicationService.getApplications(pageable);
    return new ResponseEntity<>(
        applications,
        HttpStatus.OK
    );
   }
   @GetMapping("/filters")
   public ResponseEntity<Page<ApplicationDto>>filterapplication(@RequestParam(required=false) String status,@RequestParam(required=false) String companyName, @RequestParam(required = false) String location, @RequestParam(required = false) Double minSalary,
        @RequestParam(required = false) Double maxSalary,Pageable pageable){
       Page<ApplicationDto>applications=applicationService.filterApplication(status, companyName,location,minSalary,maxSalary,pageable);
    return new ResponseEntity<>(
        applications,
        HttpStatus.OK
    );
   }
}
