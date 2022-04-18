import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Purchase } from 'src/entities/purchase.entity';
@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

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
