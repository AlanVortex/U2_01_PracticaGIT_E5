package utez.edu.mx.runrunbackend.services.car;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import utez.edu.mx.runrunbackend.models.car.CarEntity;
import utez.edu.mx.runrunbackend.models.car.CarRepository;

import java.util.List;

@Service
public class CarServices {
    private final CarRepository carRepository;

    public CarServices(CarRepository carRepository) {
        this.carRepository = carRepository;
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

    public CarEntity update(CarEntity carEntity) {
        CarEntity car = get(carEntity.getId());
        car.setBrand(carEntity.getBrand());
        car.setModel(carEntity.getModel());
        car.setColor(carEntity.getColor());
        car.setPlate(carEntity.getPlate());
        car.setProveedor(carEntity.getProveedor());
        return carRepository.save(car);
    }

    public String delete(Long id) {
        CarEntity car = get(id);
        carRepository.delete(car);
        return "Car has been deleted";
    }
}
