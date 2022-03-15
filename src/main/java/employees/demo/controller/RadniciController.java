package employees.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import employees.demo.model.Radnici;

import employees.demo.repository.RadniciRepository;

@CrossOrigin(origins = "http://localhost:8082")
@RestController
@RequestMapping("/api")
public class RadniciController {

    @Autowired
    RadniciRepository radniciRepository;

    @GetMapping("/radnici")
    public ResponseEntity<List<Radnici>> getAllRadnici(@RequestParam(required = false) String ime) {
        try {
            List<Radnici> radnici = new ArrayList<Radnici>();

            if (ime == null)
                radniciRepository.findAll().forEach(radnici::add);
            else
                radniciRepository.findByIme(ime).forEach(radnici::add);

            if (radnici.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(radnici, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/radnici/{id}")
    public ResponseEntity<Radnici> getRadnikById(@PathVariable("id") long id) {
        Optional<Radnici> radnikData = radniciRepository.findById(id);

        if (radnikData.isPresent()) {
            return new ResponseEntity<>(radnikData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/radnici")
    public ResponseEntity<Radnici> createRadnik(@RequestBody Radnici radnici) {
        try {
            Radnici _radnici = radniciRepository
                    .save(new Radnici(radnici.getIme(), radnici.getPrezime()));
            return new ResponseEntity<>(_radnici, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/radnici/{id}")
    public ResponseEntity<Radnici> updateRadnik(@PathVariable("id") long id, @RequestBody Radnici radnici) {
        Optional<Radnici> radnikData = radniciRepository.findById(id);

        if (radnikData.isPresent()) {
            Radnici _radnici = radnikData.get();
            _radnici.setIme(radnici.getIme());
            _radnici.setPrezime(radnici.getPrezime());
            return new ResponseEntity<>(radniciRepository.save(_radnici), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/radnici/{id}")
    public ResponseEntity<HttpStatus> deleteRadnik(@PathVariable("id") long id) {
        try {
            radniciRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/radnici")
    public ResponseEntity<HttpStatus> deleteAllTutorials() {
        try {
            radniciRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * @GetMapping("/radnici/published")
     * public ResponseEntity<List<Tutorial>> findByPublished() {
     * try {
     * List<Tutorial> tutorials = tutorialRepository.findByPublished(true);
     * 
     * if (tutorials.isEmpty()) {
     * return new ResponseEntity<>(HttpStatus.NO_CONTENT);
     * }
     * return new ResponseEntity<>(tutorials, HttpStatus.OK);
     * } catch (Exception e) {
     * return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
     * }
     * }
     */

}
