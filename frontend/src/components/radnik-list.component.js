import React, { Component } from "react";
import RadnikDataService from "../services/radnik.service";
import { Link } from "react-router-dom";

export default class RadniciList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchIme = this.onChangeSearchIme.bind(this);
    this.retrieveRadnici = this.retrieveRadnici.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRadnik = this.setActiveRadnik.bind(this);
    this.removeAllRadnici = this.removeAllRadnici.bind(this);
    this.searchIme = this.searchIme.bind(this);

    this.state = {
      radnici: [],
      currentRadnik: null,
      currentIndex: -1,
      searchIme: ""
    };
  }

  componentDidMount() {
    this.retrieveRadnici();
  }

  onChangeSearchIme(e) {
    const searchIme = e.target.value;

    this.setState({
      searchIme: searchIme
    });
  }

  retrieveRadnici() {
    RadnikDataService.getAll()
      .then(response => {
        this.setState({
          radnici: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveRadnici();
    this.setState({
      currentRadnik: null,
      currentIndex: -1
    });
  }

  setActiveRadnik(radnik, index) {
    this.setState({
      currentRadnik: radnik,
      currentIndex: index
    });
  }

  removeAllRadnici() {
    RadnikDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchIme() {
    this.setState({
      currentRadnik: null,
      currentIndex: -1
    });

    RadnikDataService.findByTitle(this.state.searchIme)
      .then(response => {
        this.setState({
          radnici: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchIme, radnici, currentRadnik, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Traži po imenu..."
              value={searchIme}
              onChange={this.onChangeSearchIme}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchIme}
              >
                Traži
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista Radnika</h4>

          <ul className="list-group">
            {radnici &&
              radnici.map((radnik, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveRadnik(radnik, index)}
                  key={index}
                >
                  {radnik.ime}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllRadnici}
          >
            Izbriši sve radnike
          </button>
        </div>
        <div className="col-md-6">
          {currentRadnik ? (
            <div>
              <h4>Radnik</h4>
              <div>
                <label>
                  <strong>Ime:</strong>
                </label>{" "}
                {currentRadnik.ime}
              </div>
              <div>
                <label>
                  <strong>Prezime:</strong>
                </label>{" "}
                {currentRadnik.prezime}
              </div>

              <Link
                to={"/radnici/" + currentRadnik.id}
                className="badge badge-warning"
              >
                Uredi
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Molimo Vas izaberite Radnika...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
