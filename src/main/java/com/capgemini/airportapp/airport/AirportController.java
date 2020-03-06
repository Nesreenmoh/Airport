package com.capgemini.airportapp.airport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/airports")
public class AirportController {

   @Autowired
   private  AirportRepository airportRepository;

   @GetMapping
   @ResponseBody
    public List<Airport> getAllAirport(){
       return airportRepository.findAll();
   }

   @PostMapping
    public void addAirport(@RequestBody Airport airport){
       airportRepository.save(airport);

   }

}
