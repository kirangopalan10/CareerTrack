package com.zoho.CareerTrack.Model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Getter
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
@Table(name="application")
public class Application {
    @Id 
    @GeneratedValue (strategy=GenerationType.IDENTITY)
    @Column (name="id")
    Integer applicationId;
    @Column (name="companies")
    String companyName;
    @Column (name="roles")
    String jobTitle;   
    @Column (name="status")
    String status;
    @Column (name="date")
    LocalDate appliedDate;
    @Column (name="location")
    String location;
    @Column(name="salary")
    Double  salary;
    
    
}
