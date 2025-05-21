package utez.edu.mx.runrunbackend.models.brand;

import jakarta.persistence.*;
import utez.edu.mx.runrunbackend.models.car.CarEntity;

import java.util.List;

@Entity
public class BrandEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String telephone;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<CarEntity> carEntityList;

    // Constructores
    public BrandEntity() {}
    public BrandEntity(String name, Long id) {
        this.name = name;
        this.id = id;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public List<CarEntity> getCarEntityList() { return carEntityList; }
    public void setCarEntityList(List<CarEntity> carEntityList) { this.carEntityList = carEntityList; }
}
