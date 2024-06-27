import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PreferencesService } from './preferences.service';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post('insert')
  async insertPreferences() {
    await this.preferencesService.insertPreferences();
    return { message: 'Preferences inserted successfully' };
  }

  @Post('add/:userId')
  async addPreferencesToUser(
    @Param('userId') userId: number,
    @Body('preferenceIds') preferenceIds: number[]
  ) {
    await this.preferencesService.addPreferencesToUser(userId, preferenceIds);
    return { message: 'Preferences added to user successfully' };
  }

  @Get('all')
  async getAllPreferences() {
    const preferences = await this.preferencesService.getAllPreferences();
    return { preferences };
  }
  
  @Get('user/:userId')
  async getUserPreferences(@Param('userId') userId: number) {
    const userPreferences = await this.preferencesService.getUserPreferences(userId);
    return { userPreferences };
  }
  
}
