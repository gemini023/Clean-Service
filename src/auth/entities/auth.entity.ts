import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "../../enums/enum-types";

export type UserDocument = HydratedDocument<Auth>

@Schema({ timestamps: true, collection: "users" })
export class Auth {
    @Prop({
        unique: true,
        required: true,
        minlength: 4,
        maxlength: 30
    })
    userName: string

    @Prop({
        unique: true,
        required: true,
    })
    email: string

    @Prop({
        required: true,
        minlength: 8,
    })
    password: string

    @Prop({
        type: String,
        enum: Role,
        default: Role.User
    })
    role: Role

    @Prop({
        type: Boolean,
        default: false
    })
    isVerified: boolean
}

export const AuthSchema = SchemaFactory.createForClass(Auth)