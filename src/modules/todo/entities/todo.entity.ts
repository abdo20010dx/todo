import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, now } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
    @Prop()
    userId: Types.ObjectId;

    @Prop()
    task: string;

    @Prop({ default: now() })
    createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);