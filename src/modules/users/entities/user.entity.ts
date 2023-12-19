import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types, now } from 'mongoose';
import { Todo } from 'src/modules/todo/entities/todo.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' })
    todo: Todo[];

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);