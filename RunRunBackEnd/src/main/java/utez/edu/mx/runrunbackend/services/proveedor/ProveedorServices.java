package utez.edu.mx.runrunbackend.services.proveedor;

import org.springframework.stereotype.Service;
import utez.edu.mx.runrunbackend.controllers.proveedor.ProveedorDto;
import utez.edu.mx.runrunbackend.models.proveedor.ProveedorEntity;
import utez.edu.mx.runrunbackend.models.proveedor.ProveedorRepository;

import java.util.List;

@Service
public class ProveedorServices {
    private final ProveedorRepository proveedorRepository;

    public ProveedorServices(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    public List<ProveedorEntity> all() {
        return proveedorRepository.findAll();
    }

    public ProveedorDto get(Long id) {
        ProveedorEntity proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado con id: " + id));

        return new ProveedorDto(proveedor); // 👈 usa el constructor DTO que incluye los autos
    }

    public ProveedorEntity save(ProveedorEntity proveedor) {
        return proveedorRepository.save(proveedor);
    }

    public ProveedorEntity update(ProveedorEntity proveedor) {
        return proveedorRepository.save(proveedor);
    }

    public String delete(Long id) {
        proveedorRepository.deleteById(id);
        return "Proveedor eliminado con éxito";
    }
}
