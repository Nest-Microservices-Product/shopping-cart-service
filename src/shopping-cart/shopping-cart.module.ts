import { Module } from "@nestjs/common";
import { ShoppinCartService } from "./shopping-cart.service";
import { ShoppinCartController } from "./shopping-cart.controller";
import { NatsModule } from "./transports/nats.module";

@Module({
    imports: [NatsModule],
    controllers: [ShoppinCartController],
    providers: [ShoppinCartService]
})

export class ShoppingCartModule {}