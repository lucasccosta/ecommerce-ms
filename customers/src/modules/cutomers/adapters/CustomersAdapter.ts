import { Request, Response } from 'express'
import { CreateCustomerController } from '../create/implementations/CreateCustomerController'
import { HttpResponse } from '../../../infra/DTOs'

export const createCustomerAdapter = (createCustomerController: CreateCustomerController) => {
  let response: HttpResponse
  
  return async (httpRequest: Request, httpResponse: Response) => {
    try {
      response = await createCustomerController.handle(httpRequest)
      
      return httpResponse.status(response.statusCode).json(response.body)
    } catch (error) {
      return httpResponse.status(error.status).send(error.message) 
    }
  }
}
