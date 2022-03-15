package employees.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import employees.demo.model.Radnici;

public interface RadniciRepository extends JpaRepository<Radnici, Long> {
    List<Radnici> findByIme(String ime);

    List<Radnici> findByPrezime(String prezime);

}
