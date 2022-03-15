import React, { Component } from "react";
import RadnikDataService from "../services/radnik.service";

export default class Radnik extends Component {
  constructor(props) {
    super(props);
    this.onChangeIme = this.onChangeIme.bind(this);
    this.onChangePrezime = this.onChangePrezime.bind(this);
    this.getRadnik = this.getRadnik.bind(this);
    this.updateRadnik = this.updateRadnik.bind(this);
    this.deleteRadnik = this.deleteRadnik.bind(this);

    this.state = {
      currentRadnik: {
        id: null,
        ime: "",
        prezime: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getRadnik(this.props.match.params.id);
  }

  onChangeIme(e) {
    const ime = e.target.value;

    this.setState(function (prevState) {
      return {
        currentRadnik: {
          ...prevState.currentRadnik,
          ime: ime
        }
      };
    });
  }

  onChangePrezime(e) {
    const prezime = e.target.value;

    this.setState((prevState) => ({
      currentRadnik: {
        ...prevState.currentRadnik,
        prezime: prezime
      }
    }));
  }

  getRadnik(id) {
    RadnikDataService.get(id)
      .then((response) => {
        this.setState({
          currentRadnik: response.data
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateRadnik() {
    RadnikDataService.update(
      this.state.currentRadnik.id,
      this.state.currentRadnik
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "Radnik je uspješno ažuriran!"
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteRadnik() {
    RadnikDataService.delete(this.state.currentRadnik.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/radnici");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentRadnik} = this.state;

    return (
      <div>
        {currentRadnik ? (
          <div className="edit-form">
            <h4>Radnici</h4>
            <form>
              <div className="form-group">
                <label htmlFor="ime">Ime</label>
                <input
                  type="text"
                  className="form-control"
                  id="ime"
                  value={currentRadnik.ime}
                  onChange={this.onChangeIme}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prezime">Prezime</label>
                <input
                  type="text"
                  className="form-control"
                  id="prezime"
                  value={currentRadnik.prezime}
                  onChange={this.onChangePrezime}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteRadnik}
            >
              Izbriši
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRadnik}
            >
              Ažuriraj
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Molimo Vas kliknite na Radnika...</p>
          </div>
        )}
      </div>
    );
  }
}
