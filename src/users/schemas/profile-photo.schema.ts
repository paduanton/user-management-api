import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfilePhotoDocument = ProfilePhoto & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class ProfilePhoto {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  file_system_path: string;

  @Prop({ required: true })
  file_name: string;
}

export const ProfilePhotoSchema = SchemaFactory.createForClass(ProfilePhoto);
