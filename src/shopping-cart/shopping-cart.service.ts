import { Inject, Injectable } from "@nestjs/common";
import { ShoppingCart } from "./entities/ShoppingCartI";
import { AddItemDto } from "./dtos/add-item.dto";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { NATS_SERVICE } from "src/shared/constants/NATS_SERVICE";
import { ORDERS_SERVICES_NAMES } from "src/shared/entities/OrdersServicesNames";

Injectable()
export class ShoppinCartService {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

    private shoppings: Array<ShoppingCart> = [];

    private findCart(userId: string): number {

        const indexCart = this.shoppings.findIndex(cart => cart.userId === userId);

        return indexCart;
    }

    addItem(item: AddItemDto) {

        const indexCart = this.findCart(item.userId);

        if(indexCart === -1) {

            this.shoppings.push({
                userId: item.userId,
                items: [{ 
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }]
            })

            return `Se ha creado el carrito del usuario: ${item.userId}`;

        } else {

            const existingItemIndex = this.shoppings[indexCart].items.findIndex(
                cartItem => cartItem.productId = item.productId
            )

            if(existingItemIndex !== -1) {

                this.shoppings[indexCart].items[existingItemIndex].quantity += item.quantity;
                return `Se ha actualizado la cantidad del producto en el carrito del usuario ${item.userId} `
            } else {

                this.shoppings[indexCart].items.push({ 
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                });

                return `Se ha agreado un nuevo articulo al carrito del usuario: ${item.userId}`;
            }


        }

    }

    createOrder(userId: string) {
        try {
            
            const indexCart = this.findCart(userId);

            if(indexCart === -1) {
                throw new RpcException({
                    message: `No se encontro el carrito del usuario: ${userId}`,
                    status: 404
                });
            }

            if(this.shoppings[indexCart].items.length === 0) {
                throw new RpcException({
                    message: `El carrito del usuario ${userId} está vacío`,
                    status: 400
                });
            }

            this.shoppings[indexCart].items = [];


            const result = this.client.send({
                cmd: ORDERS_SERVICES_NAMES.CREATE_ORDER
            }, this.shoppings[indexCart])

            return result;

        } catch (error) {
            throw new RpcException({
                messgae: error.message,
                status: error.status
            });
        }
    }
}