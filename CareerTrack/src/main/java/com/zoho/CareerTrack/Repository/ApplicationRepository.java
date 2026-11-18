package com.zoho.CareerTrack.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.zoho.CareerTrack.Model.Application;
//JpaSpecificationExecutor<Application>===This gives you methods for executing dynamic specifications.
public interface  ApplicationRepository extends JpaRepository<Application,Integer> ,JpaSpecificationExecutor<Application>{
    Page<Application> findByStatus(String status,Pageable pageable);
    Page<Application> findByCompanyNameContaining(String companyName,Pageable pageable);
}
