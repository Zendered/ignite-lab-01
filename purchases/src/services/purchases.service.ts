import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  listAllCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: { customerId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async createPurchase({ productId, customerId }) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found!');
    }

    await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });
  }
}
