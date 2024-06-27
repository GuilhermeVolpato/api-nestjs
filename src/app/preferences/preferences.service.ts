import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/user.entity';
import { Repository, In } from 'typeorm';
import { PreferencesEntity } from './preferences.entity';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(PreferencesEntity)
    private readonly preferenceRepository: Repository<PreferencesEntity>,
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async addPreferencesToUser(userId: number, preferenceIds: number[]) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['preferences'],
    });
    if (!user) throw new Error('User not found');

    const preferences = await this.preferenceRepository.findBy({
      id: In(preferenceIds),
    });
    user.preferences = [...user.preferences, ...preferences];

    await this.userRepository.save(user);
  }

  async insertPreferences() {
    const preferences = [
      { name: 'american_restaurant', nameToShow: 'Restaurante Americano' },
      { name: 'bakery', nameToShow: 'Padaria' },
      { name: 'bar', nameToShow: 'Bar' },
      { name: 'barbecue_restaurant', nameToShow: 'Restaurante de Churrasco' },
      { name: 'brazilian_restaurant', nameToShow: 'Restaurante Brasileiro' },
      {
        name: 'breakfast_restaurant',
        nameToShow: 'Restaurante de Café da Manhã',
      },
      { name: 'brunch_restaurant', nameToShow: 'Restaurante de Brunch' },
      { name: 'cafe', nameToShow: 'Café' },
      { name: 'chinese_restaurant', nameToShow: 'Restaurante Chinês' },
      { name: 'coffee_shop', nameToShow: 'Cafeteria' },
      { name: 'fast_food_restaurant', nameToShow: 'Restaurante de Fast Food' },
      { name: 'french_restaurant', nameToShow: 'Restaurante Francês' },
      { name: 'greek_restaurant', nameToShow: 'Restaurante Grego' },
      { name: 'hamburger_restaurant', nameToShow: 'Restaurante de Hambúrguer' },
      { name: 'ice_cream_shop', nameToShow: 'Sorveteria' },
      { name: 'indian_restaurant', nameToShow: 'Restaurante Indiano' },
      { name: 'indonesian_restaurant', nameToShow: 'Restaurante Indonésio' },
      { name: 'italian_restaurant', nameToShow: 'Restaurante Italiano' },
      { name: 'japanese_restaurant', nameToShow: 'Restaurante Japonês' },
      { name: 'korean_restaurant', nameToShow: 'Restaurante Coreano' },
      { name: 'lebanese_restaurant', nameToShow: 'Restaurante Libanês' },
      { name: 'meal_delivery', nameToShow: 'Entrega de Refeições' },
      { name: 'meal_takeaway', nameToShow: 'Refeições para Viagem' },
      {
        name: 'mediterranean_restaurant',
        nameToShow: 'Restaurante Mediterrâneo',
      },
      { name: 'mexican_restaurant', nameToShow: 'Restaurante Mexicano' },
      {
        name: 'middle_eastern_restaurant',
        nameToShow: 'Restaurante do Oriente Médio',
      },
      { name: 'pizza_restaurant', nameToShow: 'Pizzaria' },
      { name: 'ramen_restaurant', nameToShow: 'Restaurante de Ramen' },
      { name: 'restaurant', nameToShow: 'Restaurante' },
      { name: 'sandwich_shop', nameToShow: 'Lanchonete' },
      {
        name: 'seafood_restaurant',
        nameToShow: 'Restaurante de Frutos do Mar',
      },
      { name: 'spanish_restaurant', nameToShow: 'Restaurante Espanhol' },
      { name: 'steak_house', nameToShow: 'Churrascaria' },
      { name: 'sushi_restaurant', nameToShow: 'Restaurante de Sushi' },
      { name: 'thai_restaurant', nameToShow: 'Restaurante Tailandês' },
      { name: 'turkish_restaurant', nameToShow: 'Restaurante Turco' },
      { name: 'vegan_restaurant', nameToShow: 'Restaurante Vegano' },
      { name: 'vegetarian_restaurant', nameToShow: 'Restaurante Vegetariano' },
      { name: 'vietnamese_restaurant', nameToShow: 'Restaurante Vietnamita' },
    ];

    for (const preference of preferences) {
      const newPreference = this.preferenceRepository.create(preference);
      await this.preferenceRepository.save(newPreference);
    }
  }

  async getAllPreferences() {
    return await this.preferenceRepository.find();
  }

  async getUserPreferences(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['preferences'],
    });
    if (!user) throw new Error('User not found');

    return user.preferences;
  }
}
