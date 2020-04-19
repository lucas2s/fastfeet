import Mail from '../../lib/Mail';

class CreateDeliveryMail {
  get key() {
    return 'CreateDeliveryMail';
  }

  async handle({ data }) {
    const { delivery, recipient, deliveryman } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'FASTFEET - Nova entrega para você',
      template: 'CreateDeliveryMail',
      context: {
        deliveryman: deliveryman.name,
        name: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        state: recipient.state,
        city: recipient.city,
        zipcode: recipient.zipcode,
        delivery_id: delivery.id,
        product: delivery.product,
      },
    });
  }
}

export default new CreateDeliveryMail();
