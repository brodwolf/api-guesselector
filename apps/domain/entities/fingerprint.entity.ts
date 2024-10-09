import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({
  name: 'fingerprint',
})
export class FingerPrintEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  external_id: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  acronym: string;

  @Column({ nullable: true })
  country: string;

  @CreateDateColumn()
  _created_at: Date;

  constructor(fingerPrintEntity: Partial<FingerPrintEntity>) {
    Object.assign(this, fingerPrintEntity);
  }
}
