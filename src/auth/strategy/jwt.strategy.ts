import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor( private prisma: PrismaService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET,
        });
}
async validate(payload: {sub: string, email: string}){
  const user = await this.prisma.user.findUnique({
    where: {
      id: payload.sub
    }
  })
  console.log(payload)
  delete user.password
  return user
}
}