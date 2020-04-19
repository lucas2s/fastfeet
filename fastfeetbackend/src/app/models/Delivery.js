import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, ['canceled_at']),
          get() {
            return isBefore(this.get('canceled_at'), new Date());
          },
        },
        delivered: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, ['end_date']),
          get() {
            return isBefore(this.get('end_date'), new Date());
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.DeliveryMan, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.hasMany(models.DeliveryProblem);
  }
}

export default Delivery;
