import Joi from 'joi';

export const createTaskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
})

export const updateTaskSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string()
}).min(1).message("Body must have at least one field")