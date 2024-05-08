import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import IPlan from 'src/domain/plan/plan.entity';

@Schema()
export class HealthPlan extends Document implements IPlan {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    coverage: string; // Descrição da cobertura do plano

    @Prop({ required: true })
    price: number; // Preço mensal do plano

    @Prop({ required: true })
    maxVisitsPerYear: number; // Número máximo de visitas permitidas por ano

    @Prop({ required: true })
    maxAge: number; // Idade máxima do animal para aderir ao plano

    @Prop({ required: true })
    species: string[]; // Espécie de animal coberta pelo plano (cachorro, gato, etc.)
}

export const HealthPlanSchema = SchemaFactory.createForClass(HealthPlan);