package com.capgemini.airportapp.airplane;

import com.capgemini.airportapp.airport.Airport;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Airplane {

//    fields
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Integer fuel;

    @ManyToOne
    private Airport airport;
    // constructors

    public Airplane() {
    }

    public Airplane(Long id, String name, Integer fuel, Airport airport) {
        this.id = id;
        this.name = name;

        this.fuel = fuel;
        this.airport = airport;
    }

    // setter and getter


    public Airport getAirport() {
        return airport;
    }

    public void setAirport(Airport airport) {
        this.airport = airport;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getFuel() {
        return fuel;
    }

    public void setFuel(Integer fuel) {
        this.fuel = fuel;
    }
}
