package employees.demo.model;

import javax.persistence.*;

@Entity
@Table(name = "radnici")
public class Radnici {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "ime")
    private String ime;

    @Column(name = "prezime")
    private String prezime;

    public Radnici() {

    }

    public Radnici(String ime, String prezime) {
        this.ime = ime;
        this.prezime = prezime;
    }

    public long getId() {
        return id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    /*
     * @Override
     * public String toString() {
     * return "Tutorial [id=" + id + ", title=" + title + ", desc=" + description +
     * ", published=" + published + "]";
     * }
     */

}
