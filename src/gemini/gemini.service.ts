import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeminiService {

  async fetchGeminiData(): Promise<any> {
    try {
      const response = await axios.get('URL_DA_API_DE_TERCEIROS_AQUI');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
}
