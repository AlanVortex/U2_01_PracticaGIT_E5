package utez.edu.mx.runrunbackend.controllers.proveedor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.runrunbackend.models.proveedor.ProveedorEntity;
import utez.edu.mx.runrunbackend.services.proveedor.ProveedorServices;

import java.util.List;

@RestController
@RequestMapping("/api/proveedor")
@CrossOrigin("*")
public class ProveedorController {
    private final ProveedorServices proveedorServices;

    public ProveedorController(ProveedorServices proveedorServices) {
        this.proveedorServices = proveedorServices;
    }

    @GetMapping("")
    public ResponseEntity<List<ProveedorEntity>> get() {
        return ResponseEntity.ok(proveedorServices.all());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProveedorDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(proveedorServices.get(id));
    }

    @PostMapping("")
    public ResponseEntity<ProveedorEntity> create(@RequestBody ProveedorDto dto) {
        return ResponseEntity.ok(proveedorServices.save(dto.toEntity()));
    }

    @PutMapping("")
    public ResponseEntity<ProveedorEntity> update(@RequestBody ProveedorDto dto) {
        return ResponseEntity.ok(proveedorServices.update(dto.toEntity()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return ResponseEntity.ok(proveedorServices.delete(id));
    }
}
