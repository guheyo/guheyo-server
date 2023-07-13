import {DynamicModule} from "@nestjs/common";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";

export class DatabaseModule {
  static TypeOrmModule(database: string, options: TypeOrmModuleOptions): DynamicModule {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
          configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const config = configService.get(database);
        return {...config, ...options};
      },
    });
  }
}
