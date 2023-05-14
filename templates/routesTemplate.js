import { Router } from 'express';
const router = Router();

router.get('/', (req, res, next) => {
    return service.getAll();
});

router.get('/:id', (req, res, next) => {
    return service.getOne();
});

router.post('/', (req, res, next) => {
    return service.create();
});

router.put('/:id', (req, res, next) => {
    return service.update();
});

router.delete('/:id', (req, res, next) => {
    return service.delete();
});