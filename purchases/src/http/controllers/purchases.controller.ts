import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Purchase } from '@prisma/client';
import { AuthUserDTO } from 'src/interfaces/dto/auth-user-dto';
import { CustomersService } from 'src/http/services/customers.service';
import { ProductsService } from 'src/http/services/products.service';
import { PurchasesService } from 'src/http/services/purchases.service';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { CurrentUser } from '@/http/auth/current-user';

@Controller('api/v1')
export class PurchasesController {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Get('purchases')
  @UseGuards(AuthorizationGuard)
  products(): Promise<Purchase[]> {
    return this.purchasesService.listAllPurchases();
  }

  @Get(':productId')
  @UseGuards(AuthorizationGuard)
  purchases(@Param('productId') productId: string) {
    return this.productsService.getProductById(productId);
  }

  @Post(':productId')
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Param('productId') productId,
    @CurrentUser() user: AuthUserDTO,
  ) {
    let customer: any = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    return await this.purchasesService.createPurchase({
      productId,
      customerId: customer.id,
    });
  }
}
