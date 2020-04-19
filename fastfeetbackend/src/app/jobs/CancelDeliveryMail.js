import { format, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

const timeSP = 'America/Sao_Paulo';

class CancelDeliveryMail {
  get key() {
    return 'CreateAnswerMail';
  }

  async handle({ data }) {
    const { delivery, deliveryman } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'FASTFEET - Cancelamento de entrega',
      template: 'CancelDeliveryMail',
      context: {
        deliveryman: deliveryman.name,
        delivery_id: delivery.id,
        product: delivery.product,
        date_canceled: format(
          zonedTimeToUtc(parseISO(delivery.canceled_at), timeSP),
          "'Dia' dd 'de' MMMM 'de' yyyy 'horário ' HH:mm:ss",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelDeliveryMail();
