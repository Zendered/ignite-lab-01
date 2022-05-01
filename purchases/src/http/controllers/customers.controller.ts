import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthUserDTO } from '@/interfaces/dto/auth-user-dto';
import { CustomersService } from '@/http/services/customers.service';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { CurrentUser } from '@/http/auth/current-user';
import { PurchasesService } from '@/http/services/purchases.service';
import { Customer } from '@/entities/customer.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@ApiBearerAuth()
@Controller('api/v1')
export class CustomersController {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Get('customer')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Find all customer' })
  customer(@CurrentUser() user: AuthUserDTO) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @Get('purchases/customer')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Find all purchases by this customer' })
  purchases(@CurrentUser() customer: Customer) {
    return this.purchasesService.listAllCustomer(customer.id);
  }
}
