"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const config_1 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const prisma_service_1 = require("./prisma.service");
class DatabaseModule {
    static prismaModule() {
        return {
            module: DatabaseModule,
            providers: [prisma_service_1.PrismaService],
            exports: [prisma_service_1.PrismaService],
        };
    }
    static redisModule(options) {
        return cache_manager_1.CacheModule.registerAsync({
            imports: [config_1.ConfigModule],
            inject: [config_1.ConfigService],
            useFactory: async (configService) => {
                const config = configService.get('redis');
                return { ...config, ...options };
            },
        });
    }
}
exports.DatabaseModule = DatabaseModule;
