import { Injectable } from '@nestjs/common';
import { IUser } from '@nestjs-microservices-monorepo/interfaces';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async changeProfile(user: Pick<IUser, 'displayName'>, id: string) {
    const existedUser = await this.userRepository.findUserById(id);
    if (!existedUser) {
      throw new Error('Такого пользователя не существует');
    }
    const userEntity = new UserEntity(existedUser).updateProfile(
      user.displayName
    );
    await this.updateUser(userEntity);
    return {};
  }

  private updateUser(user: UserEntity) {
    this.userRepository.updateUser(user);
  }
}
