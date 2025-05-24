package utez.edu.mx.runrunbackend.controllers.car;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.runrunbackend.controllers.car.CarDto;
import utez.edu.mx.runrunbackend.models.car.CarEntity;
import utez.edu.mx.runrunbackend.models.proveedor.ProveedorRepository;
import utez.edu.mx.runrunbackend.services.car.CarServices;

import java.util.List;

@RestController
@RequestMapping("/api/automoviles")
@CrossOrigin("*")
public class CarController {

    private final CarServices carServices;

    public CarController(CarServices carServices) {
        this.carServices = carServices;
    }

    @GetMapping("")
    public ResponseEntity<List<CarEntity>> getAll() {
        return ResponseEntity.ok(carServices.all());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarEntity> getById(@PathVariable Long id) {
        return ResponseEntity.ok(carServices.get(id));
    }

    @PostMapping("")
    public ResponseEntity<CarEntity> create(@RequestBody CarDto dto) {
        return ResponseEntity.ok(carServices.save(dto.toEntity() , dto.getIdProveedor()));
    }

    @PutMapping("")
    public ResponseEntity<CarEntity> update(@RequestBody CarDto dto) {
        return ResponseEntity.ok(carServices.update(dto.toEntity() ,dto.getIdProveedor()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return ResponseEntity.ok(carServices.delete(id));
    }
}
