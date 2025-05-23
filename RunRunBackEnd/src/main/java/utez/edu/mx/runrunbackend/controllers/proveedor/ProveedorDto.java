package utez.edu.mx.runrunbackend.controllers.proveedor;

import utez.edu.mx.runrunbackend.models.proveedor.ProveedorEntity;
import utez.edu.mx.runrunbackend.models.car.CarEntity;

import java.util.List;

public class ProveedorDto {
    private Long id;
    private String name;
    private String lastname;
    private String email;
    private String phone;
    private List<CarEntity> cars;

    // Constructor que recibe una entidad y transforma a DTO
    public ProveedorDto(ProveedorEntity entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.lastname = entity.getLastname();
        this.email = entity.getEmail();
        this.phone = entity.getPhone();
        this.cars = entity.getCarEntityList();
    }

    // Constructor vacío (requerido por Jackson)
    public ProveedorDto() {}

    public ProveedorEntity toEntity() {
        return new ProveedorEntity(id, name, lastname, email, phone);
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<CarEntity> getCars() {
        return cars;
    }

    public void setCars(List<CarEntity> cars) {
        this.cars = cars;
    }
}
