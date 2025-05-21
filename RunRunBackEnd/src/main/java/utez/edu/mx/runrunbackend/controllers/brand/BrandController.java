package utez.edu.mx.runrunbackend.controllers.brand;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.runrunbackend.models.brand.BrandEntity;
import utez.edu.mx.runrunbackend.models.car.CarEntity;
import utez.edu.mx.runrunbackend.services.brand.BrandServices;

import java.util.List;

@RestController
@RequestMapping("/api/brand")
@CrossOrigin("*")

public class BrandController {
    private final BrandServices  brandServices;

    public BrandController(BrandServices brandServices) {
        this.brandServices = brandServices;
    }

    @GetMapping("")
    public ResponseEntity<List<BrandEntity>> get() {
        return ResponseEntity.ok(brandServices.all());
    }
    @GetMapping("/{id}")
    public ResponseEntity<BrandEntity> get(@PathVariable Long id) {
        return ResponseEntity.ok(brandServices.get(id));
    }
    @PutMapping("")
    public ResponseEntity<BrandEntity> update(@RequestBody BrandDto dto) {
        return ResponseEntity.ok(brandServices.update(dto.toEntity()));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id) {
        return ResponseEntity.ok(brandServices.delete(id));
    }

}
