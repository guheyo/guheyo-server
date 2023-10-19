import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { AuthorEntity } from '@lib/domains/discord-message/domain/author.entity';

@InputType()
export class SendEmbedInput {
  @IsString()
  @Field()
  discordChannelId: string;

  @IsString()
  @Field()
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

  @IsNumber()
  @Field()
  color: number;

  @IsString()
  @Field()
  title: string;

  @Field(() => AuthorEntity)
  author: AuthorEntity;

  @IsString()
  @Field()
  description: string;
}
