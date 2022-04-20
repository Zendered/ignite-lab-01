import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthUserDTO } from '../../../interfaces/dto/auth-user-dto';
import { CustomersService } from '../../../services/customers.service';
import { AuthorizationGuard } from '../authorization.guard';
import { CurrentUser } from '../current-user';
import { PurchasesService } from '../../../services/purchases.service';
import { Customer } from '../../../entities/customer.entity';

@Controller('api/v1')
export class CustomersController {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Get('customer')
  @UseGuards(AuthorizationGuard)
  customer(@CurrentUser() user: AuthUserDTO) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @Get('purchases/customer')
  @UseGuards(AuthorizationGuard)
  purchases(@CurrentUser() customer: Customer) {
    return this.purchasesService.listAllCustomer(customer.id);
  }
}
