import { Inject, Injectable } from "@nestjs/common";
import { ApisException } from "~apis/src/exceptions/apis.exception";
import { IUserRepository, IUserService } from "~apis/src/interfaces";

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject("IUserRepository") private readonly userRepository: IUserRepository) {}

  async findOne(id: number): Promise<number> {
    const data = await this.userRepository.findOne(id);
    if (!data) {
      throw new ApisException().UserNotFound();
    }
    return data;
  }
}
