package utez.edu.mx.runrunbackend.services.car;

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

    public List<CarEntity> all (){
        return carRepository.findAll();

    }
}
