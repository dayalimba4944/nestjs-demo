import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Blog {

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  mediatype: string;

  @Prop({ required: true })
  media: string;

  @Prop({ required: true })
  status: string;

}

export const BlogsSchema = SchemaFactory.createForClass(Blog);
