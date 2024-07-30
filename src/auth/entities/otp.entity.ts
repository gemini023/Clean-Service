import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type OtpDocument = HydratedDocument<Otp>

@Schema({ timestamps: true, collection: "otps" })
export class Otp {
    @Prop({
        required: true
    })
    otp: number

    @Prop({
        type: Types.ObjectId, ref: "Auth", required: true
    })
    userId: Types.ObjectId

}

export const OtpSchema = SchemaFactory.createForClass(Otp)