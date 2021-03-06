import React from "react";
import Checkout from "../components/Checkout";
import { connect } from "react-redux";
import { orderInProcess, PuntoDeEncuentro } from "../actions/orderActions";
import { addNewOrder, getPuntoDeEncuentro } from "../actions/orderActions";
import { withRouter } from "react-router-dom";
import { modifyData } from "../actions/productDataActions";

const mapDispatchToProps = (dispatch, state) => {
  return {
    addNewOrder: (data) => {
      dispatch(addNewOrder(data));
    },
    getPuntoDeEncuentro: () => {
      dispatch(getPuntoDeEncuentro());
    },
  };
};

const mapStateToProps = (state, ownprops) => {
  return {
    userEmail: state.user.user.email,
    nameUser: state.user.user.firstName,
    lastNameUser: state.user.user.lastName,
    PuntoDeEncuentro: state.orders.PuntoDeEncuentro,
    idsForOrders: state.orders.idsForOrders,
  };
};

class CheckoutContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      address: "",
      country: "",
      state: "",
      city: "",
      postCode: "",
      productDataId: "",
      deliveryPoint: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEncuentro = this.handleEncuentro.bind(this);
  }

  componentDidMount() {
    this.props.getPuntoDeEncuentro();
  }

  handleEncuentro(id) {
    this.props.addNewOrder({
      order: { deliveryPoint: true },
      productDataId: this.props.idsForOrders,
      PuntoDeEncuentro: id,
    });
    this.props.idsForOrders.map((e) => {
      modifyData({ bought: true, id: e });
    });

    this.props.history.push("/gracias");
  }

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addNewOrder({
      order: this.state,
      productDataId: this.props.idsForOrders,
    });
    this.props.idsForOrders.map((e) => {
      modifyData({ bought: true, id: e });
    });

    localStorage.removeItem("dataWithoutUser");
    this.props.history.push("/");

    this.props.history.push("/gracias");
  }

  render() {
    return (
      <div>
        <h3 className="titulopagina">Tipo de envío</h3>

        <Checkout
          PuntoDeEncuentro={this.props.PuntoDeEncuentro}
          handleEncuentro={this.handleEncuentro}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          userEmail={this.props.userEmail}
          nameUser={this.props.nameUser}
          lastNameUser={this.props.lastNameUser}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)
);
