import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: "mongodb+srv://david:david@cluster0.ibktv.mongodb.net/nest?retryWrites=true&w=majority"
                }
            }
        })
    }
}
