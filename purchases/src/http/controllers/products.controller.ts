import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/http/services/products.service';
import { ICreateProductsDTO } from 'src/interfaces/dto/create-products-dto';

@ApiTags('products')
@Controller('api/v1')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('products')
  @ApiOperation({ summary: 'Find all products' })
  products(): Promise<Product[]> {
    return this.productsService.listAllProducts();
  }

  @Post('products')
  @ApiBearerAuth()
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Create a new product' })
  createProducts(@Body() productsData: ICreateProductsDTO) {
    this.productsService.createProducts(productsData);
    return 'Product created';
  }
}
