import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryDeliveryProblemController {
  async indexProblem(req, res) {
    const { page = 1 } = req.query;

    const deliverys = await Delivery.findAll({
      where: {
        start_date: {
          [Op.ne]: null,
        },
        canceled_at: null,
        end_date: null,
      },
      order: ['created_at'],
      attributes: ['id', 'product', 'start_date', 'end_date', 'created_at'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [DeliveryProblem],
    });

    if (deliverys.length < 1) {
      return res
        .status(400)
        .json({ error: 'Não foi encontrado nenhuma encomenda com problema' });
    }

    const deliverysProblems = deliverys.filter(
      delivery => delivery.DeliveryProblems.length > 0
    );

    if (deliverysProblems.length < 1) {
      return res
        .status(400)
        .json({ error: 'Não foi encontrado nenhuma encomenda com problema' });
    }

    return res.json({
      deliverysProblems,
    });
  }

  async indexByIdProblem(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const delivery = await Delivery.findByPk(id, {
      include: { model: DeliveryProblem, limit: 10, offset: (page - 1) * 10 },
    });

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'Id da encomenda enviado é inválido' });
    }

    const problems = delivery.DeliveryProblems;

    return res.json({
      problems,
    });
  }
}
export default new DeliveryDeliveryProblemController();
