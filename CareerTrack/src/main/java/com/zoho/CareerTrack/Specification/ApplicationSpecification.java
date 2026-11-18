package com.zoho.CareerTrack.Specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.zoho.CareerTrack.Model.Application;

import jakarta.persistence.criteria.Predicate;

public class ApplicationSpecification {

    public static Specification<Application> filterApplication(
            String status,
            String companyName,
            String location,
            Double minSalary,
            Double maxSalary) {

        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            // 1. STATUS - exact match
            if (status != null && !status.isEmpty()) {

                predicates.add(
                    criteriaBuilder.equal(
                        root.get("status"),
                        status
                    )
                );
            }

            // 2. COMPANY NAME - partial match
            if (companyName != null && !companyName.isEmpty()) {

                predicates.add(
                    criteriaBuilder.like(
                        root.get("companyName"),
                        "%" + companyName + "%"
                    )
                );
            }

            // 3. LOCATION - partial match
            if (location != null && !location.isEmpty()) {

                predicates.add(
                    criteriaBuilder.like(
                        root.get("location"),
                        "%" + location + "%"
                    )
                );
            }

            // 4. MINIMUM SALARY
            if (minSalary != null) {

                predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(
                        root.get("salary"),
                        minSalary
                    )
                );
            }

            // 5. MAXIMUM SALARY
            if (maxSalary != null) {

                predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(
                        root.get("salary"),
                        maxSalary
                    )
                );
            }

            // Combine all conditions using AND
            return criteriaBuilder.and(
                predicates.toArray(new Predicate[0])
            );
        };
    }
}