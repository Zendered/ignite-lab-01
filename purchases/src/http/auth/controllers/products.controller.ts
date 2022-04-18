import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaPromise, Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Controller('api/v1')
export class ProductsController {
  constructor(private prisma: PrismaService) {}

  @Get('products')
  @UseGuards(AuthorizationGuard)
  products(): PrismaPromise<Product[]> {
    return this.prisma.product.findMany();
  }
}
