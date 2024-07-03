import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/db.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GraphsModule } from './graphs/graphs.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectTeamModule } from './project-team/project-team.module';
import { ResourcesSalaryManagementModule } from './resources-salary-management/resources-salary-management.module';
import { ExpenseRateModule } from './expense-rate/expense-rate.module';
import { AssetRequestModule } from './asset-request/asset-request.module';
import { StripeUsersModule } from './stripe-users/stripe-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UsersModule,
    GraphsModule,
    TasksModule,
    ProjectsModule,
    ProjectTeamModule,
    ResourcesSalaryManagementModule,
    ExpenseRateModule,
    AssetRequestModule,
    StripeUsersModule,
  ],
  controllers: [AppController],
  providers: [

    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },

  ],
})
export class AppModule { }
