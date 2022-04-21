import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';
import { ICreateProductsDTO } from 'src/interfaces/dto/create-products-dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProducts({ title }: ICreateProductsDTO) {
    const slug = slugify(title, { lower: true });
    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new HttpException(
        'Product already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
