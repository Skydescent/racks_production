import CalcContext from "./CalcContext";

const CalcProvider = () => {
  const state = {
    cars: {
      car001: { name: "Honda", price: 100 },
      car002: { name: "BMW", price: 150 },
      car003: { name: "Mercedes", price: 200 },
    },
  };

  return (
    <CalcContext.Provider
      value={{
        cars: this.state.cars,
        incrementPrice: (selectedID) => {
          const cars = Object.assign({}, this.state.cars);
          cars[selectedID].price = cars[selectedID].price + 1;
          this.setState({
            cars,
          });
        },
        decrementPrice: (selectedID) => {
          const cars = Object.assign({}, this.state.cars);
          cars[selectedID].price = cars[selectedID].price - 1;
          this.setState({
            cars,
          });
        },
      }}
    >
      {this.props.children}
    </CalcContext.Provider>
  );
};

export default CalcProvider;
