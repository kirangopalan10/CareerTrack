package com.zoho.CareerTrack.Dto;
import java.time.LocalDate;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter 
@Setter 
@AllArgsConstructor 
@NoArgsConstructor 
public class ApplicationDto {
    
    Integer applicationId; 
    @NotBlank(message="company name is required")
    @Size(
        min = 2,
        max = 100,
        message = "Company name must be between 2 and 100 characters"
    )
    String companyName;
    @NotBlank(message="job title is required")
    @Size(
        min = 2,
        max = 100,
        message = "Company name must be between 2 and 100 characters"
    )
    String jobTitle;
    @Pattern(
    regexp = "Applied|Interview|Rejected|Selected",
    message = "Invalid application status"
    )  
    String status;
    LocalDate appliedDate;
    @NotBlank(message = "Location is required")
    @Size(
        min = 2,
        max = 100,
        message = "Location must be between 2 and 100 characters"
    )
    String location;
    @Positive(message = "Salary must be greater than 0")
    Double salary;

}
