import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json({
      recipient,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zipcode: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res
        .status(400)
        .json({ error: 'Id do destinatário enviado é inválido' });
    }

    const recipientRes = await recipient.update(req.body);

    return res.json({
      recipientRes,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res
        .status(400)
        .json({ error: 'Id do destinatário enviado é inválido' });
    }

    await recipient.destroy();

    return res.json({
      message: 'Destinatário excluído com sucesso',
    });
  }

  async indexById(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res
        .status(400)
        .json({ error: 'Id do destinatário enviado é inválido' });
    }

    return res.json({
      recipient,
    });
  }

  async index(req, res) {
    const { name = '', page = 1 } = req.query;

    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      order: ['created_at'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    if (recipients.length < 1) {
      return res
        .status(400)
        .json({ error: 'Não foi encontrado nenhum destinatário' });
    }

    return res.json({
      recipients,
    });
  }
}

export default new RecipientController();
