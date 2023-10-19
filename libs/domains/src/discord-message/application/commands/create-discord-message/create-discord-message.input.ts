import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateDiscordMessageInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  discordMessageId: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  discordChannelId: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  discordGuildId: string;

  @IsString()
  @Field()
  modelName: string;

  @IsUUID()
  @Field(() => ID)
  modelId: string;

  @IsUUID()
  @Field(() => ID)
  guildId: string;
}
