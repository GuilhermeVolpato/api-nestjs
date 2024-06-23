import { Controller, Get, Query } from '@nestjs/common';
import { GeminiService } from './gemini.service';

interface PrecisoReceberDaRequisicaoDoUsuario {
  latitude: string;
  longitude: string;
  id: string;
}

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get()
  async getGeminiData(@Query() params: PrecisoReceberDaRequisicaoDoUsuario): Promise<any> {
    try {
      const { latitude, longitude, id } = params;
      const geminiData = await this.geminiService.fetchGemini();
      return geminiData;
    } catch (error) {
      throw error;
    }
  }
}



      // teste : http://localhost:8099/gemini?latitude=-28.649662125654135&longitude=-49.34508824309808&id=123
      //const geminiData = await this.geminiService.fetchGeminiData(latitude, longitude, id);