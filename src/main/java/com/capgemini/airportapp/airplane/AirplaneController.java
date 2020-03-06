package com.capgemini.airportapp.airplane;

import com.capgemini.airportapp.airport.Airport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/airplanes")
public class AirplaneController {

    @Autowired
    AirplaneRepository airplaneRepository;

    @GetMapping
    @ResponseBody
    public List<Airplane> getAllAirplane(){
        return airplaneRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Airplane getAllAirplane(@PathVariable Long id){
        return airplaneRepository.findOneById(id);
    }
    @PostMapping
    public void addAirplane(@RequestBody Airplane airplane) {
        airplaneRepository.save(airplane);
    }

    // check if the fuel is enough

    @GetMapping("/move")
    public Boolean checkFuel(@RequestBody Airplane airplane,@RequestBody Airport airport) {
        if(airplane.getFuel()< 2) {
            return false;
        }
            else{
                airplane.setFuel(airplane.getFuel()-2);
                airplane.setAirport(airport);
                airplaneRepository.save(airplane);
                return true;
        }
    }

    // to refull an airplane when we click on refill
    @PutMapping("/refull")
    public void updateFuel(@RequestBody Airplane airplane){
        airplane.setFuel(5);
        airplaneRepository.save(airplane);
    }



    @DeleteMapping("/{id}")
    public void deleteAirplane(@PathVariable Long id){
        airplaneRepository.deleteById(id);
    }
}
