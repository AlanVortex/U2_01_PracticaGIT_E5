package utez.edu.mx.runrunbackend.controllers.proveedor;

import utez.edu.mx.runrunbackend.models.proveedor.ProveedorEntity;

public class ProveedorDto {
    private Long id;
    private String name;

    public ProveedorDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public ProveedorEntity toEntity () {
        return new ProveedorEntity(name,id);
    }
}
