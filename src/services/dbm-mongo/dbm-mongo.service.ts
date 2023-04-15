import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbmModel, ResponseModel } from 'src/models/dbm-model/dbm-model';

@Injectable()
export class DbmMongoService {

    constructor(@InjectModel('DBManagerSchema') private readonly dbmModel: Model<DbmModel>){}


    async insert(data){
        let resp : ResponseModel =  await this.insertData(data);
        return(resp);
    } 

    async insertData(data) : Promise<ResponseModel>{
        let resp : ResponseModel = null
        try{
            const insertedData = new this.dbmModel({
                data: data,
                active: true
            })
            const result = await insertedData.save()
            resp = new ResponseModel({id: result.id, data: result.data, active: result.active},true);
        }
        catch(error){
            console.log("error:", error)
            resp = new ResponseModel(error,false);
            
        }
        return resp;
    }

    async updateById(data){
        let resp : ResponseModel = null;

        try{
            if(data.id){
                let mongoData = await this.dbmModel.findById(data.id).exec();
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
            console.log("error:", error)
            resp = new ResponseModel(error,false);
        }
        return(resp);
    }

    async findById(id){
        let resp : ResponseModel = null;

        let result; 
        try{
            result = await this.dbmModel.findById(id).exec();
            if(result.active){
                resp = new ResponseModel({id: result.id, data: result.data},true);
            }
            else{
                resp = new ResponseModel('No Data Found.',false);
            throw new NotFoundException('No Data Found.')
            }
        }
        catch(error){
            console.log("error:", error)
            resp = new ResponseModel(error,false);
            throw new NotFoundException('No Data Found.')
        }
        return(resp);
    }

    async findAll(){
        let resp : ResponseModel = null;
        try{
            const result = await this.dbmModel.find({active:true}).exec();
            resp = new ResponseModel(result.map((o) =>( {
                id: o.id,
                data: o.data,
                active: o.active
            })),true);
        }
        catch(error){
            console.log("error:", error)
            resp = new ResponseModel(error,false);
        }
        
        return(resp);
    }

    async deleteById(data){
        let resp : ResponseModel = null;
        
        try{
            let mongoData = await this.dbmModel.findById(data.id).exec();
            if(mongoData.active){
                mongoData.active = false;
                mongoData.save();
                resp = new ResponseModel("data removed",true);
            }
            else{
                resp = new ResponseModel("No Data Found.",false);
            }
        }
        catch(error){
            console.log("error:", error)
            resp = new ResponseModel(error,false);
        }
        return(resp);
    }

    // executeQuery(body){
    //     console.log(body);
    //     return(body);
    // }

}
