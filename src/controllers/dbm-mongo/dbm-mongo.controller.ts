import { Post, Get, Controller, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { DbmMongoService } from 'src/services/dbm-mongo/dbm-mongo.service';

@Controller('dbm-mongo')
export class DbmMongoController {
    constructor(private svc:DbmMongoService){}

    @Get('health')
    health(@Res() res: Response){
        res.status(200).send("Healthy")
    }

    @Post('insert')
    async insert(@Req() req: Request, @Res() res: Response){
        const result = await this.svc.insert(req.body);
        res.send(result);
    }

    @Post('updateById')
    async updateById(@Req() req: Request, @Res() res: Response){
        const result = await this.svc.updateById(req.body)
        res.send(result);
    }

    @Post('findById')
    async findById(@Req() req: Request, @Res() res: Response){
        const result = await this.svc.findById(req.body.id)
        res.send(result);
    }

    @Post('findAll')
    async findAll(@Req() req: Request, @Res() res: Response){
        const result = await this.svc.findAll()
        res.send(result);
    }

    // @Post('executeQuery')
    // executeQuery(@Req() req: Request, @Res() res: Response){
    //     console.log(req.body);
    //     res.send(this.svc.executeQuery(req.body));
    // }


}
