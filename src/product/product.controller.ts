import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { json, query } from 'express';
import { createProductDTO } from './dto/product.dto';
import { ProductService} from './product.service'


@Controller('product')
export class ProductController {

    constructor(private productservice: ProductService) {}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: createProductDTO) {
       const product = await this.productservice.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
              message: 'The product was added succesfully.',
              product: product
        }); 
        

    }
    @Get('/')
    async getProducts(@Res() res) {
     const products = await this.productservice.getProducts();
     res.status(HttpStatus.OK).json({
         message: "Products list",
         products
     });
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
     const product = await this.productservice.getProduct(productID);
     if (!product) throw new NotFoundException('This Product does not exist.');
    return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID')productID ) {
       const deletedproduct = await this.productservice.deleteProduct(productID)
     if (!deletedproduct) throw new NotFoundException('This Product does not exist.');
       return res.status(HttpStatus.OK).json({
           message: "Product deleted succesfully.",
            deletedproduct
        })
    }
    @Put('/edit')
    async updateProduct(@Res() res, @Body() createProductDTO: createProductDTO, @Query('productID') productID){
        const productupdated = await this.productservice.updateProduct(productID, createProductDTO)
        if (!productupdated) throw new NotFoundException('This Product does not exist.');
        return res.status(HttpStatus.OK).json({
            message: "Product updated succesfully.",
            productupdated
        })

    }
}
