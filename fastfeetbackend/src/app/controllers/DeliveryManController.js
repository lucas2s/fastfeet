import * as Yup from 'yup';
import { Op } from 'sequelize';

import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const deliveryMan = await DeliveryMan.create(req.body);

    return res.json({
      deliveryMan,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { id } = req.params;

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return res
        .status(400)
        .json({ error: 'Id do entregador enviado é inválido' });
    }

    const deliveryManRes = await deliveryMan.update(req.body);

    return res.json({
      deliveryManRes,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return res
        .status(400)
        .json({ error: 'Id do entregador enviado é inválido' });
    }

    await deliveryMan.destroy();

    return res.json({
      message: 'Entregador excluído com sucesso',
    });
  }

  async indexById(req, res) {
    const { id } = req.params;

    const deliveryMan = await DeliveryMan.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryMan) {
      return res
        .status(400)
        .json({ error: 'Id do entregador enviado é inválido' });
    }

    return res.json({
      deliveryMan,
    });
  }

  async index(req, res) {
    const { name = '', page = 1 } = req.query;

    const deliveryMans = await DeliveryMan.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      order: ['created_at'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (deliveryMans.length < 1) {
      return res
        .status(400)
        .json({ error: 'Não foi encontrado nenhum entregador' });
    }

    return res.json({
      deliveryMans,
    });
  }
}

export default new DeliveryManController();
