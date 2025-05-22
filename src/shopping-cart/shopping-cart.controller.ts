import { Controller } from "@nestjs/common";
import { ShoppinCartService } from "./shopping-cart.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AddItemDto } from "./dtos/add-item.dto";

@Controller()
export class ShoppinCartController {
    constructor(private readonly shoppingCartService: ShoppinCartService) {}

    @MessagePattern({ cmd: 'add-item'})
    addItem(@Payload() item: AddItemDto) {
        return this.shoppingCartService.addItem(item);
    }
    
    @MessagePattern({ cmd: 'give-order'})
    createOrder(@Payload() userId: string) {
        return this.shoppingCartService.createOrder(userId);
    }
}