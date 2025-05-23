package utez.edu.mx.runrunbackend.services.proveedor;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import utez.edu.mx.runrunbackend.models.proveedor.ProveedorEntity;
import utez.edu.mx.runrunbackend.models.proveedor.ProveedorRepository;

import java.util.List;

@Service
public class ProveedorServices {

    private final ProveedorRepository proveedorRepository;

    public ProveedorServices(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    public ProveedorEntity save(ProveedorEntity entity) {
        return proveedorRepository.save(entity);
    }

    public List<ProveedorEntity> all() {
        return proveedorRepository.findAll();
    }

    public ProveedorEntity get(Long id) {
        return proveedorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Proveedor not found"));
    }

    public ProveedorEntity update(ProveedorEntity proveedorEntity) {
        ProveedorEntity proveedor = get(proveedorEntity.getId());
        proveedor.setName(proveedorEntity.getName());
        proveedor.setLastName(proveedorEntity.getLastname());
        proveedor.setEmail(proveedorEntity.getEmail());
        proveedor.setPhone(proveedorEntity.getPhone());
        return proveedorRepository.save(proveedor);
    }

    public String delete(Long id) {
        ProveedorEntity proveedor = get(id);
        proveedorRepository.delete(proveedor);
        return "Proveedor has been deleted";
    }
}
