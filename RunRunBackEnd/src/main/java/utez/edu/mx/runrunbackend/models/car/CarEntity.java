package utez.edu.mx.runrunbackend.models.car;

import jakarta.persistence.*;
import utez.edu.mx.runrunbackend.models.brand.BrandEntity;

@Entity
public class CarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private BrandEntity brand;
    private String model;

    public BrandEntity getBrand() {
        return brand;
    }

    public void setBrand(BrandEntity brand) {
        this.brand = brand;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
