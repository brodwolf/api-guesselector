import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';
import { ulid } from 'ulid';

@Entity({
  name: 'user',
})
export class UserEntity {
  @ObjectIdColumn()
  @Exclude()
  _id: ObjectId;

  @Column({ unique: true })
  external_id: string;

  @Column({ length: 256 })
  name: string;

  @Column({ length: 256, unique: true })
  mail: string;

  @Column({ unique: true })
  login: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  _created_at: Date;

  @BeforeInsert()
  beforeInsert() {
    this.external_id = ulid();
  }

  constructor(userEntity: Partial<UserEntity>) {
    Object.assign(this, userEntity);
  }
}
