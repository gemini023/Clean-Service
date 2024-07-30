import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type RefreshTokenDocument = HydratedDocument<Refresh>

@Schema({ timestamps: true, collection: "refreshTokens" })
export class Refresh {

    @Prop()
    refreshToken: string

    @Prop({
        type: Types.ObjectId, ref: "Auth", required: true
    })
    userId: Types.ObjectId
}

export const RefreshSchema = SchemaFactory.createForClass(Refresh)