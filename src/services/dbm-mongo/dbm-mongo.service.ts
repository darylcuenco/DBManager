import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbmModel, ResponseModel } from 'src/models/dbm-model/dbm-model';

@Injectable()
export class DbmMongoService {

    constructor(@InjectModel('DBManager') private readonly dbmModel: Model<DbmModel>){}

    async insert(data){
        let resp : ResponseModel = null;
        try{
            const insertedData = new this.dbmModel({
                data: data
            })
            const result = await insertedData.save()
            resp = new ResponseModel({id: result.id, data: result.data},true);
        }
        catch(error){
            resp = new ResponseModel(error,false);
            
        }
        
        console.log(resp);
        return(resp);
    } 

    async updateById(data){
        let resp : ResponseModel = null;

        try{
            let mongoData = await this.dbmModel.findById(data.id).exec();
            const result = {
                ...mongoData.data,
                ...data
            }
            mongoData.data = result;
            mongoData.save();
            resp = new ResponseModel({id: data.id, data: mongoData.data},true);
        }
        catch(error){
            resp = new ResponseModel(error,false);
        }
        return(resp);
    }

    async findById(id){
        let resp : ResponseModel = null;

        let result; 
        try{
            result = await this.dbmModel.findById(id).exec();
            resp = new ResponseModel({id: result.id, data: result.data},true);
        }
        catch(error){
            resp = new ResponseModel(error,false);
            throw new NotFoundException('No Data Found.')
        }
        return(resp);
    }

    async findAll(){
        let resp : ResponseModel = null;
        try{
            const result = await this.dbmModel.find().exec();
            resp = new ResponseModel(result.map((o) =>( {
                id: o.id,
                data: o.data
            })),true);
        }
        catch(error){
            resp = new ResponseModel(error,false);
        }
        
        return(resp);
    }

    // executeQuery(body){
    //     console.log(body);
    //     return(body);
    // }

}
