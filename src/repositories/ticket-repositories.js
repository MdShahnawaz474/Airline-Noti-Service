const { Ticket } = require("../models");
const crudRepository = require("./crud-repository");

class TicketRepository extends crudRepository {
  constructor() {
    super(Ticket);
  }

  async getPendingTickets() {
    const response = await Ticket.findAll({
      where: {
        status: "PENDING",
      },
    });
    return response;
  }
}
module.exports = TicketRepository;
