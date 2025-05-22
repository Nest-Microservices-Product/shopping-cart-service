import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { env } from "src/config/getEnvs";
import { NATS_SERVICE } from "src/shared/constants/NATS_SERVICE";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: NATS_SERVICE,
                transport: Transport.NATS,
                options: {
                    servers: env.natsServer
                }
            }
        ])
    ],
    exports: [
        ClientsModule.register([
            {
                name: NATS_SERVICE,
                transport: Transport.NATS,
                options: {
                    servers: env.natsServer
                }
            }
        ])
    ]
})

export class NatsModule {}