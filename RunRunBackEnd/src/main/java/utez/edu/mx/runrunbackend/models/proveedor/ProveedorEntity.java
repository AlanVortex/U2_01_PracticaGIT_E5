package utez.edu.mx.runrunbackend.models.proveedor;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import utez.edu.mx.runrunbackend.models.car.CarEntity;

import java.util.List;

@Entity
public class ProveedorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL, fetch = FetchType.LAZY,orphanRemoval = true)
    private List<CarEntity> carEntityList;


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    public void setName(String name) {
        this.name = name;

    }
    public String getName() {
        return name;
    }

    public ProveedorEntity(String name, Long id) {
        this.name = name;
        this.id = id;
    }
    public ProveedorEntity() {
    }

    public List<CarEntity> getCarEntityList() {
        return carEntityList;
    }

    public void setCarEntityList(List<CarEntity> carEntityList) {
        this.carEntityList = carEntityList;
    }
}

