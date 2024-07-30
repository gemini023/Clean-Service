import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ServiceDocument = HydratedDocument<Service>

@Schema({ timestamps: true, collection: "services" })
export class Service {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price: number;

}

export const ServiceSchema = SchemaFactory.createForClass(Service);
