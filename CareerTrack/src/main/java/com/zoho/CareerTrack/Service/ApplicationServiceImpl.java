package com.zoho.CareerTrack.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.zoho.CareerTrack.Dto.ApplicationDto;
import com.zoho.CareerTrack.Exception.ApplicationNotFoundException;
import com.zoho.CareerTrack.Mapper.ApplicationMapper;
import com.zoho.CareerTrack.Model.Application;
import com.zoho.CareerTrack.Repository.ApplicationRepository;
import com.zoho.CareerTrack.Specification.ApplicationSpecification;

@Service 
public  class ApplicationServiceImpl implements ApplicationService{

    @Autowired 
    public  ApplicationRepository applicationRepository;
  

     //CREATE AN APPLICATION

    public ApplicationDto createApplication(ApplicationDto applicationDto){
        Application application=ApplicationMapper.maptoApplication(applicationDto);
        Application createdApplication=applicationRepository.save(application);
        return ApplicationMapper.maptoApplicationDto(createdApplication);
    }

    //FETCH AN APPLICATION BY ID

    public ApplicationDto getapplicationByid(Integer id){
        Application existingApplication =applicationRepository.findById(id)
        .orElseThrow(()-> 
        new ApplicationNotFoundException("Application not found with id " + id)
        );
        return ApplicationMapper.maptoApplicationDto(existingApplication);
    }
    //FETCH ALL APPLICATION
    
    public Page<ApplicationDto> getallApplication(Pageable pageable){
        Page<Application>applications=applicationRepository.findAll(pageable);
        return applications.map(
            application->
                     ApplicationMapper.maptoApplicationDto(application)
            );
    }
    
    //UPDATE BY ID

    public ApplicationDto updateApplication(Integer id,ApplicationDto updatedapplicationdto){
        Application application=applicationRepository.findById(id)
        .orElseThrow(()->
        new ApplicationNotFoundException("Aplication not found with id "+id)
        );
        application.setCompanyName(updatedapplicationdto.getCompanyName()) ;
        application.setJobTitle(updatedapplicationdto.getJobTitle());
        application.setStatus(updatedapplicationdto.getStatus());
        application.setAppliedDate(updatedapplicationdto.getAppliedDate());
        application.setSalary(updatedapplicationdto.getSalary());
        application.setLocation(updatedapplicationdto.getLocation());
        Application updatedApplication=applicationRepository.save(application);
        return ApplicationMapper.maptoApplicationDto(updatedApplication);
    }
    
    //DELETE BY ID

    public void deleteApplicationByid(Integer id){
        Application application=applicationRepository.findById(id)
        .orElseThrow(()->
        new ApplicationNotFoundException("Aplication not found with id "+id)
        );
        applicationRepository.deleteById(id);
    }

    //FILTER BY Status

    public Page<ApplicationDto>filterByStatus(String status,Pageable pageable){
        Page<Application>applications=applicationRepository.findByStatus(status,pageable);
        return applications.map(
            application->
                    ApplicationMapper.maptoApplicationDto(application)
        );
     }
    //SEARCH BY 
     public Page<ApplicationDto>searchApplication(String companyName ,Pageable pageable){
        Page<Application> applications=applicationRepository.findByCompanyNameContaining(companyName,pageable);
           return applications.map(
            application ->
                    ApplicationMapper.maptoApplicationDto(application)
           );
     }

    //GET AS PAGES 
    public Page<ApplicationDto>getApplications(Pageable pageable){
        Page<Application>applications=applicationRepository.findAll(pageable);
        return applications.map(
            application->
                 ApplicationMapper.maptoApplicationDto(application)           
        );
    }

    //MULTIPLE FILTERS USING SPECIFICATION

    public Page<ApplicationDto>filterApplication(String status,String companyName,String location,Double minSalary,Double maxSalary,Pageable pageable){
        Specification<Application>specifications=ApplicationSpecification.filterApplication(status, companyName,location,minSalary,maxSalary);
        Page<Application>applications=applicationRepository.findAll(specifications,pageable);
        return applications.map(
            application->
                      ApplicationMapper.maptoApplicationDto(application)
        );
    }
        

}
 