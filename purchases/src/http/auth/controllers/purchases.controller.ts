import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Purchase } from '@prisma/client';
import { ProductsService } from 'src/services/products.service';
// import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { PurchasesService } from 'src/services/purchases.service';
import { AuthorizationGuard } from '../authorization.guard';

@Controller('api/v1')
export class PurchasesController {
  constructor(
    private PurchasesService: PurchasesService,
    private productsService: ProductsService,
  ) {}

  @Get('purchases')
  @UseGuards(AuthorizationGuard)
  products(): Promise<Purchase[]> {
    return this.PurchasesService.listAllPurchases();
  }

  @Get(':productId')
  @UseGuards(AuthorizationGuard)
  purchases(@Param('productId') productId: string) {
    return this.productsService.getProductById(productId);
  }
}
