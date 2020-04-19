import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { id, deliveryid } = req.params;
    const { description } = req.body;
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

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: deliveryid,
      description,
    });

    return res.json({
      deliveryProblem,
    });
  }
}

export default new DeliveryProblemController();
