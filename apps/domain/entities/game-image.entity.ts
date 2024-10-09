import { Column } from 'typeorm';

export class GameImageEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  url: string;
}
