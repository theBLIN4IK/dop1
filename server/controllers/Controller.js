import { ApiError } from '../exceptions/api-errors.js';
import axios from 'axios';
class MembersController {
   static async getMembers(req, res, next) {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      res.json(response.data.results)
    } catch (error) {
      next(ApiError.BadRequest(error.message))
    }
   }
}
export default MembersController