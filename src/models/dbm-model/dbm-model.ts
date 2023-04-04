
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import * as mongoose from 'mongoose'

export const DBSchema = new mongoose.Schema(
    {
        data: {
            type: mongoose.Schema.Types.Mixed,
            required: true
          }
    }
)

export interface DbmModel extends mongoose.Document{
    id: string,
    data: any
}

export class ResponseModel{
    constructor(
        public result: any,
        public isSuccess: boolean
      ) {}
    
    
}