package com.capgemini.airportapp.airplane;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AirplaneRepository extends JpaRepository<Airplane, Long> {

    public Airplane findOneById(Long id);
}
