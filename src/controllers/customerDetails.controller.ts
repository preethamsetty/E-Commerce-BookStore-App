import { Request, Response, NextFunction } from 'express';
import  CustomerDetailsService  from '../services/customerDetails.service';
import HttpStatus from 'http-status-codes';

class CustomerDetailsController {
    private CustomerDetailsService = new CustomerDetailsService();

    public getCustomerDetails =async(
        req: Request, 
        res: Response,
        next: NextFunction
        ): Promise<void> => {
            try {
                const { userId } = req.body;
                const result = await this.CustomerDetailsService.getCustomerDetails(userId);
                res.status(result.code).json({
                    code: result.code,
                    data: result.data,
                    message: result.message,
                });
            } catch (error) {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    data: null,
                    message: error.message || 'An error occurred',
                });
            }
        }

    public updateCustomerDetails = async(
    req: Request, 
    res: Response,
    next: NextFunction
    ): Promise<void> => {
        try {
            const { body, params } = req;
            const result = await this.CustomerDetailsService.updateCustomerDetails(body, params.id);
            res.status(result.code).json({
                code: result.code,
                data: result.data,
                message: result.message,
            });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                message: error.message || 'An error occurred',
            });
        }
    } 
}

export default CustomerDetailsController;