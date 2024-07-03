import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ILike, Like, Repository } from 'typeorm';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { helper } from '@/helper';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) { }
  create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.save(createTaskDto);
    const response = {
      message: 'Task created successfully',
      task: task
    };
    return response;
  }

  async findAll(options: PaginationDto, value: string) {
    const { limit, page } = options;
    const skip = (page - 1) * limit;
    let whereConditions: Array<any> = [];
    if (value) {
      whereConditions = [{ taskName: ILike(`%${value}%`) }];
    }
    if (value) {
      whereConditions = [{ taskName: ILike(`%${value}%`) }];
    }
    const data = await this.tasksRepository.findAndCount({
      where: value ? whereConditions : {},
      relations: {
        user: true,
        project: true,
      },
      order: {},
      skip: skip,
      take: limit,
    });
    const finalResponse = helper.paginateResponse(data, page, limit);
    return finalResponse;
  }
  // async findOne(userId: string) {
  //   const mytasks = await this.tasksRepository.find({
  //     where: { userId: userId },
  //   });
  //   return mytasks;
  // }
  // 
  // async findOne(userId: string) {
  //   const mytasks = await this.tasksRepository.find({
  //     where: { userId: userId },
  //   });

  //   const groupedTasks = mytasks.reduce((acc, task) => {
  //     const { createdDate } = task;
  //     const key = createdDate;
  //     if (!acc[key]) {
  //       acc[key] = [];
  //     }
  //     acc[key].push(task);
  //     return acc;
  //   }, {});

  //   const formattedResponse = Object.entries(groupedTasks).map(([date, tasks]) => ({
  //     createdDate: date,
  //     specificDayTasks: tasks,
  //   }));

  //   return formattedResponse;
  // }
  // async findOne(userId: string, taskStatus?: string) {
  //   // Build the query object
  //   const query: any = {
  //     where: { userId },
  //   };

  //   // Add taskStatus to the query if it is provided
  //   if (taskStatus) {
  //     query.where.taskStatus = taskStatus;
  //   }

  //   // Fetch the tasks from the repository
  //   const mytasks = await this.tasksRepository.find(query);

  //   // Group the tasks by createdDate
  //   const groupedTasks = mytasks.reduce((acc, task) => {
  //     const { createdDate } = task;
  //     const date = new Date(createdDate); // Convert string to Date object
  //     const key = date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
  //     if (!acc[key]) {
  //       acc[key] = [];
  //     }
  //     acc[key].push(task);
  //     return acc;
  //   }, {});

  //   // Format the response
  //   const formattedResponse = Object.entries(groupedTasks).map(([date, tasks]) => ({
  //     createdDate: date,
  //     specificDayTasks: tasks,
  //   }));

  //   return formattedResponse;
  // }
  // async findOne(userId: string, taskStatus?: string) {
  //   // Build the query object
  //   const query: any = {
  //     where: { userId },
  //   };

  //   // Add taskStatus to the query if it is provided and not "all"
  //   if (taskStatus && taskStatus !== 'All') {
  //     query.where.taskStatus = taskStatus;
  //   }

  //   // Fetch the tasks from the repository
  //   const mytasks = await this.tasksRepository.find(query);

  //   // Group the tasks by createdDate =
  //   const groupedTasks = mytasks.reduce((acc, task) => {
  //     const { createdDate } = task;
  //     const date = new Date(createdDate); // Convert string to Date object
  //     const key = date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
  //     if (!acc[key]) {
  //       acc[key] = [];
  //     }
  //     acc[key].push(task);
  //     return acc;
  //   }, {});

  //   const formattedResponse = Object.entries(groupedTasks).map(([date, tasks]) => ({
  //     createdDate: date,
  //     specificDayTasks: tasks,
  //   }));

  //   return formattedResponse;
  // }
  async findOne(userId: string, taskStatus?: string, search?: string, createdDate?: string) {
    const query: any = {
      where: { userId },
    };
  
    if (taskStatus && taskStatus !== 'All') {
      query.where.taskStatus = taskStatus;
    }
  
    if (search) {
      query.where.taskName = Like(`%${search}%`);
    }
  
    if (createdDate) {
      // Assuming createdDate is in 'YYYY-MM-DD' format
      query.where.createdDate = createdDate;
    }
  
    const mytasks = await this.tasksRepository.find(query);
  
    const groupedTasks = mytasks.reduce((acc, task) => {
      const { createdDate } = task;
      const date = new Date(createdDate);
      const key = date.toISOString().split('T')[0];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(task);
      return acc;
    }, {});
  
    const formattedResponse = Object.entries(groupedTasks).map(([date, tasks]) => ({
      createdDate: date,
      specificDayTasks: tasks,
    }));
  
    return formattedResponse;
  }
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const mytasks = await this.tasksRepository.update(id, updateTaskDto);
    return mytasks;
  }

  async remove(id: number) {
    const mytasks = await this.tasksRepository.delete(id);
    return mytasks;
  }
}
