package utez.edu.mx.runrunbackend.controllers.car;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utez.edu.mx.runrunbackend.models.car.CarEntity;
import utez.edu.mx.runrunbackend.services.car.CarServices;

import java.util.List;

@RestController()
@RequestMapping("/api/cars")
@CrossOrigin("*")
public class CarController {
    private final CarServices carServices;
    public CarController(CarServices carServices) {
        this.carServices = carServices;
    }

    @GetMapping("")
    public ResponseEntity<List<CarEntity>> get() {
        return ResponseEntity.ok(carServices.all());
    }
}
