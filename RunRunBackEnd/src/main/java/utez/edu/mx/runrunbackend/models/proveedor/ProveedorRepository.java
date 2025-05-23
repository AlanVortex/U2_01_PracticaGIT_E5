package utez.edu.mx.runrunbackend.models.proveedor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRepository extends JpaRepository<ProveedorEntity,Long> {
    ProveedorEntity findById(long id);
}
