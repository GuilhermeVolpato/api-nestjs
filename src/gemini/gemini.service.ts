import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { VertexAI } from '@google-cloud/vertexai';
import { GoogleAuth } from 'google-auth-library';

@Injectable()
export class GeminiService {
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GEMINI_API_KEY');
  }

  async fetchGemini() {
    const placeApi = axios.create();

    const API_KEY = process.env.PLACES_API_KEY;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask':
          'places.displayName,places.formattedAddress,places.primaryType,places.primaryTypeDisplayName,places.id',
      },
    };

    placeApi.defaults.baseURL = 'https://places.googleapis.com/v1/places';

    const requestBody = {
      includedTypes: ['restaurant'],
      locationRestriction: {
        circle: {
          center: {
            latitude: -28.6783,
            longitude: -49.3704,
          },
          radius: 10000.0,
        },
      },
    };

    const response = await placeApi
      .post(':searchNearby?key=' + API_KEY, requestBody, config)
      .catch((error) => {
        console.error('Error fetching location data:', error);
        throw error;
      });

    const genAI = new GoogleGenerativeAI(this.apiKey);

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let places = response?.data?.places;

    const placeNames = JSON.stringify(places);

    let prompt1 = `Estou procurando por recomendações de restaurantes dentro dessa lista: ${placeNames} Minhas preferências são restaurantes desses tipos Italianos, só recomende restaurantes dentro dessa lista, me retorna uma lista de objetos dos restaurante, [{nome, id}], os ids foi passando junto com os restaurantes.`;

    model.generationConfig.temperature = 0;

    const result = await model.generateContent(prompt1).catch((error) => {
      console.error('Error generating content:', error);
      throw error;
    });

    const response2 = result.response;

    const text = response2.text();

    return text;
  }
}
