package com.zoho.CareerTrack.Service;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.zoho.CareerTrack.Dto.ApplicationDto;

public interface  ApplicationService {
    abstract  ApplicationDto createApplication(ApplicationDto applicationDto);
    abstract ApplicationDto getapplicationByid(Integer id);
    abstract Page<ApplicationDto> getallApplication(Pageable pageable);
    abstract  ApplicationDto updateApplication(Integer id,ApplicationDto applicationDto);
    abstract void deleteApplicationByid(Integer id);
    abstract  Page<ApplicationDto> filterByStatus(String status,Pageable pageable);
    abstract Page<ApplicationDto> searchApplication(String compayName,Pageable pageable);
    abstract Page<ApplicationDto>getApplications(Pageable pageable);
    abstract Page<ApplicationDto> filterApplication(String status ,String companyName,String location,Double minSalary,Double maxSalary,Pageable pageable);

}
