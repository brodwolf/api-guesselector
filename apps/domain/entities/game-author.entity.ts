import { Column } from 'typeorm';

export class GameAuthorEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  url: string;
}
