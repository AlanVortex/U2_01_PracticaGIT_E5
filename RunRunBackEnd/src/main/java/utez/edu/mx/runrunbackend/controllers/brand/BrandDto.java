package utez.edu.mx.runrunbackend.controllers.brand;

import utez.edu.mx.runrunbackend.models.brand.BrandEntity;

public class BrandDto {
    private Long id;
    private String name;

    public BrandDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public BrandEntity toEntity () {
        return new BrandEntity(name,id);
    }
}
