import express, { Express } from 'express';
import { db } from './db/in-memory.db';
import { Driver } from './drivers/types/driver';
import { HttpStatus } from './drivers/types/http-statuses';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.delete('/testing/all-data', (req, res) => {
    db.drivers = [];
    res.sendStatus(HttpStatus.NoContent);
  });

  app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
  });

  app.get('/drivers', (req, res) => {
    // возвращаем всех водителей
    res.status(200).send(db.drivers);
  });

  app.get('/drivers/:id', (req, res) => {
    // ищем водителя в бд по id
    const driver = db.drivers.find((d) => d.id === +req.params.id);
    if (!driver) {
      return res.status(404).send({ message: 'Driver not found' });
    }
    // возвращаем ответ
    res.status(200).send(driver);
  });

  app.post('/drivers', (req, res) => {
    //1) проверяем приходящие данные на валидность
    //2) создаем newDriver
    const newDriver: Driver = {
      id: db.drivers.length ? db.drivers[db.drivers.length - 1].id + 1 : 1,
      createdAt: new Date(),
      ...req.body,
    };
    //3) добавляем newDriver в БД
    db.drivers.push(newDriver);
    //4) возвращаем ответ
    res.status(201).send(newDriver);
  });

  return app;
};
