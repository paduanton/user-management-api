import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvatarDocument = Avatar & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Avatar {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  file_system_path: string;

  @Prop({ required: true })
  file_name: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
