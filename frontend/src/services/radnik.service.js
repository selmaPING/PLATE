import http from "../http-common";

class RadnikDataService {
  getAll() {
    return http.get("/radnici");
  }

  get(id) {
    return http.get(`/radnici/${id}`);
  }

  create(data) {
    return http.post("/radnici", data);
  }

  update(id, data) {
    return http.put(`/radnici/${id}`, data);
  }

  delete(id) {
    return http.delete(`/radnici/${id}`);
  }

  deleteAll() {
    return http.delete(`/radnici`);
  }

  findByTitle(ime) {
    return http.get(`/radnici?ime=${ime}`);
  }
}

export default new RadnikDataService();