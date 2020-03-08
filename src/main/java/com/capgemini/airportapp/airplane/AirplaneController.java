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

    @PutMapping("/{id}/move")
    public void checkFuel(@RequestBody Airplane airplane) {
               airplane.setFuel((airplane.getFuel())-2);
                airplaneRepository.save(airplane);

    }

    // to refull an airplane when we click on refill
    @PutMapping("/{id}/refill")
    public void updateFuel(@RequestBody Airplane airplane){
        airplane.setFuel(5);
        airplaneRepository.save(airplane);
    }



    @DeleteMapping("/{id}")
    public void deleteAirplane(@PathVariable Long id){
        airplaneRepository.deleteById(id);
    }
}
