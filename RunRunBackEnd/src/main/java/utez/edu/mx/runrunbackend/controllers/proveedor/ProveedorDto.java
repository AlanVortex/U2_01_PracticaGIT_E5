package utez.edu.mx.runrunbackend.controllers.proveedor;

import utez.edu.mx.runrunbackend.models.proveedor.ProveedorEntity;

public class ProveedorDto {
    private Long id;
    private String name;
    private String email;
    private String phone;

    public ProveedorDto(Long id, String name,  String email, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public ProveedorEntity toEntity () {
        return new ProveedorEntity(name,id, email, phone);
    }
}
