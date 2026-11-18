package com.zoho.CareerTrack.Mapper;
import com.zoho.CareerTrack.Dto.ApplicationDto;
import com.zoho.CareerTrack.Model.Application;

public class ApplicationMapper {
   public static  ApplicationDto maptoApplicationDto(Application application){
    return new ApplicationDto(
        application.getApplicationId(),
        application.getCompanyName(),
        application.getJobTitle(),
        application.getStatus(),
        application.getAppliedDate(),
        application.getLocation(),
        application.getSalary()
    );
   }
   public static Application maptoApplication(ApplicationDto applicationDto) {
    Application application = new Application();
    application.setCompanyName(applicationDto.getCompanyName());
    application.setJobTitle(applicationDto.getJobTitle());
    application.setStatus(applicationDto.getStatus());
    application.setAppliedDate(applicationDto.getAppliedDate());
    application.setLocation(applicationDto.getLocation());
    application.setSalary(applicationDto.getSalary());
    return application;
}
}
