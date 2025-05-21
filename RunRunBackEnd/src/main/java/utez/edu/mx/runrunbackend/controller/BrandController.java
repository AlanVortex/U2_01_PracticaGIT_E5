package utez.edu.mx.runrunbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.runrunbackend.models.brand.BrandEntity;
import utez.edu.mx.runrunbackend.models.brand.BrandRepository;

import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "*")
public class BrandController {
    @Autowired
    private BrandRepository repository;

    @GetMapping
    public List<BrandEntity> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<BrandEntity> create(@RequestBody BrandEntity proveedor) {
        BrandEntity saved = repository.save(proveedor);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BrandEntity> update(@PathVariable Long id, @RequestBody BrandEntity proveedor) {
        return repository.findById(id)
                .map(p -> {
                    p.setName(proveedor.getName());
                    p.setEmail(proveedor.getEmail());
                    p.setTelephone(proveedor.getTelephone());
                    return new ResponseEntity<>(repository.save(p), HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
