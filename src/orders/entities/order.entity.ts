import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Status } from "src/enums/enum-types";

export type OrderDocument = HydratedDocument<Order>

@Schema({ timestamps: true, collection: "orders" })
export class Order {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
    serviceId: Types.ObjectId;

    @Prop({ type: String, enum: Status, default: Status.Pending })
    status: Status;

}

export const OrderSchema = SchemaFactory.createForClass(Order);
