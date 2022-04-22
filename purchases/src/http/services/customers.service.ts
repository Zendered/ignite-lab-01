import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getCustomerByAuthUserId(authUserId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { authUserId },
    });

    if (!customer) {
      throw new HttpException('Customer not found!', HttpStatus.BAD_REQUEST);
    }

    return customer;
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    const customer = await this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
    if (!customer) {
      throw new HttpException('Customer not found!', HttpStatus.BAD_REQUEST);
    }
  }
}
