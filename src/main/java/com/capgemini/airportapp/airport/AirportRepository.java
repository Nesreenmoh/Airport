package com.capgemini.airportapp.airport;


import org.springframework.data.jpa.repository.JpaRepository;

public interface AirportRepository  extends JpaRepository<Airport, Long> {
}
