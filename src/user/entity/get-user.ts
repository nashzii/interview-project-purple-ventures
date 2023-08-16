import { Exclude, Expose } from 'class-transformer';

export class GetUserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<GetUserEntity>) {
    Object.assign(this, partial);
  }
}
