import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { AuthorInput } from '../../dtos/author.input';

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

  @Field(() => AuthorInput)
  authorInput: AuthorInput;

  @IsString()
  @Field()
  description: string;
}
