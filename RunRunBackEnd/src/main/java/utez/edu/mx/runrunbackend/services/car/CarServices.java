package utez.edu.mx.runrunbackend.services.car;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import utez.edu.mx.runrunbackend.models.car.CarEntity;
import utez.edu.mx.runrunbackend.models.car.CarRepository;
import utez.edu.mx.runrunbackend.models.proveedor.ProveedorEntity;
import utez.edu.mx.runrunbackend.services.proveedor.ProveedorServices;

import java.util.List;

@Service
public class CarServices {
    private final CarRepository carRepository;
    private final ProveedorServices proveedorServices;

    public CarServices(CarRepository carRepository, ProveedorServices proveedorServices) {
        this.carRepository = carRepository;
        this.proveedorServices = proveedorServices;
    }

    public List<CarEntity> all() {
        return carRepository.findAll();
    }

    public CarEntity get(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Car not found"));
    }

    public CarEntity save(CarEntity carEntity) {
        return carRepository.save(carEntity);
    }
    public CarEntity save(CarEntity carEntity , Long idProveedor) {
        ProveedorEntity proveedorEntity = proveedorServices.get(idProveedor);
        carEntity.setProveedor(proveedorEntity);
        return carRepository.save(carEntity);
    }

    public CarEntity update(CarEntity carEntity ,  Long idProveedor) {
        CarEntity car = get(carEntity.getId());
        car.setModel(carEntity.getModel());
        car.setColor(carEntity.getColor());
        car.setPlate(carEntity.getPlate());
        ProveedorEntity proveedorEntity = proveedorServices.get(idProveedor);
        car.setProveedor(proveedorEntity);
        return carRepository.save(car);
    }

    public String delete(Long id) {
        CarEntity car = get(id);
        carRepository.delete(car);
        return "Car has been deleted";
    }
}
