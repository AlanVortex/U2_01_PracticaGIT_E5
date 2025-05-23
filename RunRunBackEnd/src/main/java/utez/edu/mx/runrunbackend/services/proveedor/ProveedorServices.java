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
    public List<ProveedorEntity> all (){
        return proveedorRepository.findAll();
    }
    public ProveedorEntity get(Long id){
        return proveedorRepository.findById(id) .orElseThrow(() -> new EntityNotFoundException("Proveedor not found"));
    }
    public ProveedorEntity update(ProveedorEntity brandEntity){
        ProveedorEntity brand = get(brandEntity.getId());
        brand.setName(brandEntity.getName());
        return proveedorRepository.save(brand);
    }
    public String delete(Long id){
        ProveedorEntity brand = get(id);
        proveedorRepository.delete(brand);
        return "Proveedor has been deleted";
    }

}
