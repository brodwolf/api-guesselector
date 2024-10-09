import { Exclude, Type } from 'class-transformer';
import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { ulid } from 'ulid';
import { GameAuthorEntity } from './game-author.entity';
import { GameImageEntity } from './game-image.entity';
import { GameStatisticsEntity } from './game-statistics.entity';

@Entity({
  name: 'game',
})
export class GameEntity {
  @ObjectIdColumn()
  @Exclude()
  _id: ObjectId;

  @Column({ unique: true })
  external_id: string;

  @Column()
  url: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  tags: string[];

  @Type(() => GameStatisticsEntity)
  @Column(() => GameStatisticsEntity)
  statistics: GameStatisticsEntity;

  @Type(() => GameAuthorEntity)
  @Column(() => GameAuthorEntity)
  author: GameAuthorEntity;

  @Type(() => GameImageEntity)
  @Column(() => GameImageEntity)
  images: GameImageEntity[] = [];

  @CreateDateColumn()
  _created_at: Date;

  @UpdateDateColumn()
  _updated_at: Date;

  @BeforeInsert()
  beforeInsert() {
    this.external_id = ulid();
  }

  constructor(gameEntity: Partial<GameEntity>) {
    Object.assign(this, gameEntity);
  }
}
