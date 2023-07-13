import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export abstract class CommonEntity {
  @ApiProperty()
  @UpdateDateColumn({ name: "update_ts" })
  updatedAt: Date;

  @ApiProperty()
  @CreateDateColumn({ name: "create_ts" })
  createdAt: Date;
}
