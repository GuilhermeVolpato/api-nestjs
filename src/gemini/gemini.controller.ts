import { Controller, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get()
  async getGeminiData(): Promise<any> {
    try {
      const geminiData = await this.geminiService.fetchGeminiData();
      return geminiData;
    } catch (error) {
      throw error;
    }
  }
}
