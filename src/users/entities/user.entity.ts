import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'bigint', generated: 'uuid' })
  public id: string;

  @Column({ nullable: true })
  public first_name?: string;

  @Column({ nullable: true })
  public last_name?: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public created_at: Date;

  @Column({ nullable: true })
  public update_at: Date;

  @Exclude()
  public currentHashedRefreshToken?: string;
}
