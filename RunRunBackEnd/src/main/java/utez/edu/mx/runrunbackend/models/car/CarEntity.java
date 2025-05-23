package utez.edu.mx.runrunbackend.models.car;

import jakarta.persistence.*;
import utez.edu.mx.runrunbackend.models.proveedor.ProveedorEntity;

@Entity
public class CarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;
    private String color;
    private String plate;

    @ManyToOne
    @JoinColumn(name = "proveedor_id", nullable = false)
    private ProveedorEntity proveedor;

    // ====== Getters y Setters ======

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public ProveedorEntity getProveedor() {
        return proveedor;
    }

    public void setProveedor(ProveedorEntity proveedor) {
        this.proveedor = proveedor;
    }

    public CarEntity(Long id, String brand, String model, String color, String plate, ProveedorEntity proveedor) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.plate = plate;
        this.proveedor = proveedor;
    }

    public CarEntity() {
    }

}
