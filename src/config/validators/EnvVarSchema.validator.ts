import * as joi from 'joi';
import { EnvVars } from '../entities/EnvVars.entity';

export const envSchema = joi
    .object<EnvVars>({
        PORT: joi.number().required(),
        NATS_SERVERS: joi.array().items(joi.string()).required()
    })
    .unknown(true);