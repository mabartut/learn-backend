import { Request, Response, Router } from 'express';
import { db } from '../../db/in-memory.db';
import { HttpStatus } from '../../core/types/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { vehicleInputDtoValidation } from '../validation/vehicleInputDtoValidation';
import { Driver } from '../types/driver';

export const driversRouter = Router();

driversRouter
  .get('', (_req: Request, res: Response) => {
    res.status(200).send(db.drivers);
  })

  .get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const driver = db.drivers.find((d) => d.id === id);

    if (!driver) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
        );
      return;
    }
    res.status(200).send(driver);
  })

  .post('', (req: Request, res: Response) => {
    const errors = vehicleInputDtoValidation(req.body);

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    const newDriver: Driver = {
      id: db.drivers.length ? db.drivers[db.drivers.length - 1].id + 1 : 1,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      vehicleMake: req.body.vehicleMake,
      vehicleModel: req.body.vehicleModel,
      vehicleYear: req.body.vehicleYear,
      vehicleLicensePlate: req.body.vehicleLicensePlate,
      vehicleDescription: req.body.vehicleDescription,
      vehicleFeatures: req.body.vehicleFeatures,
      createdAt: new Date(),
    };
    db.drivers.push(newDriver);
    res.status(HttpStatus.Created).send(newDriver);
  });
