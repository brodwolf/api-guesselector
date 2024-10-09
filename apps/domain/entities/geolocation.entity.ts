import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({
  name: 'geolocation',
})
export class GeolocationEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  start_range: number;

  @Column()
  end_range: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  acronym: string;

  @Column()
  country: string;

  constructor(geolocationEntity: Partial<GeolocationEntity>) {
    Object.assign(this, geolocationEntity);
  }
}
