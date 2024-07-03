import { HttpException, Injectable, Global, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, ILike, In, Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { EMAIL_ALREADY_EXIST_RESPONSE } from '@/common/constants/http-responses.types';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { helper } from '@/helper';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfile } from './entities/user-profile.entity';
@Global()
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepo: Repository<UserProfile>,
    private readonly dataSource: DataSource,
  ) { }
  async getByUserId(id): Promise<Users[]> {
    const findIds = await this.userRepo.findByIds(id);
    console.log('uuuid ', findIds);
    return await this.userRepo.find({
      where: {
        userId: id,
      },
    });
  }
  async findUsersByUuids(uuids): Promise<Users[]> {
    const findIds = await this.userRepo.findByIds(uuids);
    console.log('uuuid ', findIds);
    return await this.userRepo.find({
      where: {
        userId: In(uuids),
      },
    });
  }
  async findUserByIdWithProjects(userId: string) {
    return this.userRepo.findOne({
      where: { userId },
      relations: ['resourceSalary', 'task', 'teams', 'teams.project'],
    });
  }
  async create(body: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const isUser = await this.userRepo.findOne({
      where: {
        email: body.email,
      },
    });
    if (isUser)
      throw new HttpException(
        EMAIL_ALREADY_EXIST_RESPONSE.message,
        EMAIL_ALREADY_EXIST_RESPONSE.status,
      );

    await queryRunner.startTransaction();
    try {
      // Create a customer on stripe as well

      const user = queryRunner.manager.create(Users, {
        ...body,
      });
      const saveOne = await queryRunner.manager.save(user);
      const userProfile = queryRunner.manager.create(UserProfile, {
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        user: { userId: saveOne.userId },
      });
      await queryRunner.manager.save(userProfile);
      await queryRunner.commitTransaction();
      return saveOne;
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        error?.response?.body?.errors[0]?.message || error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

 

  // get all users
  async getUserList() {
    const user = await this.userRepo.find({
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
      },
      relations: {},
    });
    return user;
  }

  async getByUserByEmail(email: string) {
    const isUser = await this.userRepo.findOne({
      where: {
        email: email,
      },
      relations: {
        userProfile: true,
      },
      order: {},
    });
    return isUser;
  }

  /**
   *
   * @param id
   * @returns
   */


  // Update/Reset password
  async updateUserPassword(email: string, newPassword: string) {
    const user = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });

    user.password = newPassword;
    const updatedUser = await this.userRepo.save(user);

    return updatedUser;
  }

  // reset password by otp
  async resetPassword(user: Users, newPassword: string) {
    // Reset the user's password
    user.password = newPassword;
    await this.userRepo.save(user);
  }

  // add OTP code in user entity

  // refactor this method and rewrite the code pls

  async findAll(options: PaginationDto, value: string) {
    const { limit, page, isPagination } = options;
    const skip = (page - 1) * limit;
    if (isPagination) {
      let whereConditions: Array<any> = [];
      if (value) {
        whereConditions = [
          { firstName: ILike(`%${value}%`) },
          { lastName: ILike(`%${value}%`) },
          { email: ILike(`%${value}%`) },
          { phoneNumber: ILike(`%${value}%`) },
          { loginId: ILike(`%${value}%`) },
          //  { userId: ILike(`%${value}%`) },
        ];
      } else {
      }
      const data = await this.userRepo.findAndCount({
        where: value ? whereConditions : {},
        select: {
          userId: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          isActive: true,
          userRole: true,
          loginId: true,
        },
        // relations: {
        //   // userProfile: true,
        //   //  task: true,
        //   teams: true,

        //   // resourceSalary:true,
        // },
        relations: ['resourceSalary', 'task', 'task.user', 'teams', 'teams.project', 'requestAsset'],
        //  relations: ['assiingReview.assingBy','reviews.assignTo'],
        // relations: ['reviews'],
        order: {},
        skip: skip,
        take: limit,
      });

      const finalResponse = helper.paginateResponse(data, page, limit);
      return finalResponse;
    }
    else{
      const allUsers = await this.userRepo.find()
      return allUsers
    }
  }
  async myResourcesTasks(options: PaginationDto, value: string) {
    const { limit, page } = options;
    const skip = (page - 1) * limit;

    let whereConditions: Array<any> = [];
    if (value) {
      whereConditions = [
        { firstName: ILike(`%${value}%`) },
        { lastName: ILike(`%${value}%`) },
        { email: ILike(`%${value}%`) },
        { loginId: ILike(`%${value}%`) },
        { phoneNumber: ILike(`%${value}%`) },
        //  { userId: ILike(`%${value}%`) },
      ];
    } else {
    }

    // Include tasks in the query
    const data = await this.userRepo.findAndCount({
      where: value ? whereConditions : {},
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        userRole: true,
        phoneNumber: true,
        loginId: true,
      },
      relations: ['task'], // Include the 'task' relation
      order: {},
      skip: skip,
      take: limit,
    });

    const finalResponse = helper.paginateResponse(data, page, limit);

    return finalResponse;
  }
  async updateUser(
    id: string,
    userProfileData: CreateUserDto,

  ) {
    const user = await this.userRepo.update(id, userProfileData);
    return user;
  }
  // async updateUser(
  //   id: string,
  //   userProfileData: UpdateUserDto,
  // ): Promise<UserProfile> {
  //   const user = await this.userRepo.findOne({
  //     where: {
  //       userId: id,
  //     },
  //   });
  //   this.userRepo.merge(user);
  //   await this.userRepo.save(user);

  //   const userProfile: UserProfile = await this.userProfileRepo.findOne({
  //     where: {
  //       user: { userId: id },
  //     },
  //   });
  //   this.userProfileRepo.merge(userProfile, userProfileData);
  //   const updatedUser = await this.userProfileRepo.save(userProfile);
  //   return updatedUser;
  // }

  async delete(id: string) {
    const user = await this.userRepo.delete({
      userId: id,
    });
    return user;
  }
}
