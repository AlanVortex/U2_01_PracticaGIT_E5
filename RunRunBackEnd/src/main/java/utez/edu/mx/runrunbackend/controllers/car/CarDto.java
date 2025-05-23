package utez.edu.mx.runrunbackend.controllers.car;
import jakarta.persistence.EntityNotFoundException;
import utez.edu.mx.runrunbackend.models.car.CarEntity;
import utez.edu.mx.runrunbackend.models.proveedor.ProveedorEntity;
import utez.edu.mx.runrunbackend.models.proveedor.ProveedorRepository;

public class CarDto {
    private Long id;
    private String brand;
    private String model;
    private String color;
    private String plate;
    private Long idProveedor;

    public CarDto() {
    }

    public CarDto(Long id, String brand, String model, String color, String plate, Long idProveedor) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.plate = plate;
        this.idProveedor = idProveedor;
    }

    public CarEntity toEntity(ProveedorRepository proveedorRepository) {
        ProveedorEntity proveedor = proveedorRepository.findById(idProveedor)
                .orElseThrow(() -> new EntityNotFoundException("Proveedor no encontrado con id: " + idProveedor));
        return new CarEntity(id, brand, model, color, plate, proveedor);
    }

    // Getters y setters
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

    public Long getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Long idProveedor) {
        this.idProveedor = idProveedor;
    }
}
