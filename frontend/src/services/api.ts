import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost/api/v1'
})