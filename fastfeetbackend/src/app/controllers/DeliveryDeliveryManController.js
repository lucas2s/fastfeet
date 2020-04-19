import * as Yup from 'yup';
import { Op } from 'sequelize';
import { zonedTimeToUtc } from 'date-fns-tz';
import {
  set,
  isAfter,
  parseISO,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';

import Delivery from '../models/Delivery';
import File from '../models/File';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

const timeSP = 'America/Sao_Paulo';

class DeliveryDeliveryManController {
  async updateStart(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { id, deliveryid } = req.params;
    const delivery = await Delivery.findByPk(deliveryid);

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'Id da encomenda enviado é inválido' });
    }

    if (delivery.deliveryman_id !== Number(id)) {
      return res
        .status(400)
        .json({ error: 'Encomenda pertence a outro entregador' });
    }

    if (delivery.start_date) {
      return res.status(400).json({ error: 'Encomenda já está retirada' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Encomenda está cancelada' });
    }

    const { start_date } = req.body;
    let startDate;

    if (!start_date) {
      startDate = new Date();
    } else {
      startDate = zonedTimeToUtc(parseISO(start_date), timeSP);
    }

    const startTime = set(new Date(), {
      hours: 8,
      minutes: 0,
      seconds: 0,
    });
    const endTime = set(new Date(), {
      hours: 18,
      minutes: 0,
      seconds: 0,
    });

    if (isBefore(startDate, startTime)) {
      return res
        .status(400)
        .json({ error: 'Data e hora retirada menor do que a permitida' });
    }

    if (isAfter(startDate, endTime)) {
      return res
        .status(400)
        .json({ error: 'Data e hora retirada maior do que a permitida' });
    }

    const countDeliveries = await Delivery.count({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [startOfDay(startDate), endOfDay(startDate)],
        },
      },
    });

    if (countDeliveries >= 5) {
      return res
        .status(400)
        .json({ error: 'Entregador já realizou 5 retiradas' });
    }

    const deliveryRes = await delivery.update({ start_date: startDate });

    return res.json({
      deliveryRes,
    });
  }

  async updateEnd(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.date(),
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { id, deliveryid } = req.params;
    const delivery = await Delivery.findByPk(deliveryid);

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'Id da encomenda enviado é inválido' });
    }

    if (delivery.deliveryman_id !== Number(id)) {
      return res
        .status(400)
        .json({ error: 'Encomenda pertence a outro entregador' });
    }

    if (!delivery.start_date) {
      return res.status(400).json({ error: 'Encomenda não foi retirada' });
    }

    if (delivery.end_date) {
      return res.status(400).json({ error: 'Encomenda já está encerrada' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Encomenda está cancelada' });
    }

    const { end_date, signature_id } = req.body;
    let endDate;

    if (!end_date) {
      endDate = new Date();
    } else {
      endDate = zonedTimeToUtc(parseISO(end_date), timeSP);
    }

    if (isBefore(endDate, delivery.start_date)) {
      return res
        .status(400)
        .json({ error: 'Data e hora entrega menor do que a retirada' });
    }

    const signature = await File.findByPk(signature_id);

    if (!signature) {
      return res.status(400).json({ error: 'ID da assinatura inválido' });
    }

    const deliveryRes = await delivery.update({
      end_date: endDate,
      signature_id,
    });

    return res.json({
      deliveryRes,
    });
  }

  async index(req, res) {
    const { page = 1, delivered } = req.query;
    const { id } = req.params;

    const deliveredbool = delivered === 'true';

    const deliverys = await Delivery.findAll({
      where: {
        canceled_at: null,
        deliveryman_id: id,
        end_date: deliveredbool ? { [Op.ne]: null } : null,
      },
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled',
        'delivered',
        'created_at',
      ],
      order: ['created_at'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zipcode',
          ],
        },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name'],
        },
      ],
    });

    return res.json({
      deliverys,
    });
  }
}

export default new DeliveryDeliveryManController();
