import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as dotenv from 'dotenv'

dotenv.config()


@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url:  process.env.DB
                }
            }
        })
    }
}
