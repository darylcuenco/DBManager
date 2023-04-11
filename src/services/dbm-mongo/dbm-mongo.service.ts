import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbmModel, ResponseModel } from 'src/models/dbm-model/dbm-model';

@Injectable()
export class DbmMongoService {

    constructor(@InjectModel('DBManager') private readonly dbmModel: Model<DbmModel>){}


    async insert(data){
        let resp : ResponseModel =  await this.insertData(data);
        console.log("resp: " + resp);
        return(resp);
    } 

    async insertData(data) : Promise<ResponseModel>{
        let resp : ResponseModel = null
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
        return resp;
    }

    async updateById(data){
        let resp : ResponseModel = null;

        try{
            if(data.id){
                let mongoData = await this.dbmModel.findById(data.id).exec();
                console.log("mongoData: " + mongoData)
                let id = data.id
                delete data.id
                const result = {
                    ...mongoData.data,
                    ...data
                }
                // delete result.data.id
                mongoData.data = result;
                mongoData.save();
                resp = new ResponseModel({id: id, data: mongoData.data},true);
            }
            else{
                console.log("upserting...")
                resp = await this.insertData(data);
            }
            
        }
        catch(error){
            console.log("error")
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
