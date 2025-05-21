package utez.edu.mx.runrunbackend.services.brand;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import utez.edu.mx.runrunbackend.models.brand.BrandEntity;
import utez.edu.mx.runrunbackend.models.brand.BrandRepository;

import java.util.List;

@Service
public class BrandServices {

    private final BrandRepository brandRepository;
    public BrandServices(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }
    public List<BrandEntity> all (){
        return brandRepository.findAll();
    }
    public BrandEntity get(Long id){
        return brandRepository.findById(id) .orElseThrow(() -> new EntityNotFoundException("Car not found"));
    }
    public BrandEntity update(BrandEntity brandEntity){
        BrandEntity brand = get(brandEntity.getId());
        brand.setName(brandEntity.getName());
        return brandRepository.save(brand);
    }
    public String delete(Long id){
        BrandEntity brand = get(id);
        brandRepository.delete(brand);
        return "Car has been deleted";
    }

}
