import { Column } from 'typeorm';

export class GameStatisticsEntity {
  @Column({ nullable: true })
  rating: number;

  @Column({ default: 0 })
  access: string;
}
