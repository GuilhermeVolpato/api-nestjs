import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcrypt';
import { PreferencesEntity } from '../preferences/preferences.entity';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'created_at', nullable: true})
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true})
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true})
  deletedAt: Date;

  @ManyToMany(() => PreferencesEntity)
  @JoinTable({
    name: 'users_preferences',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'preference_id',
      referencedColumnName: 'id'
    }
  })
  preferences: PreferencesEntity[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10)
  }
}
