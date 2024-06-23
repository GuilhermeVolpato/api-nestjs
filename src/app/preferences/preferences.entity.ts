import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/user.entity';

@Entity({ name: 'preferences' })
export class PreferencesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'portuguese_name' })
  nameToShow: string;

  @ManyToMany(() => UsersEntity, user => user.preferences)
  users: UsersEntity[];
}
