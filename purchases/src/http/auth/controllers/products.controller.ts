import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/products.service';
import { ICreateProductsDTO } from 'src/interfaces/dto/create-products-dto';

@Controller('api/v1')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('products')
  products(): Promise<Product[]> {
    return this.productsService.listAllProducts();
  }

  @Post('products')
  @UseGuards(AuthorizationGuard)
  createProducts(@Body() productsData: ICreateProductsDTO) {
    this.productsService.createProducts(productsData);
    return 'Product created';
  }
}
