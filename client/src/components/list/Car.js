import { GET_PERSON_WITH_CARS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import CarCard from "../listItems/CarCard";
import { List } from "antd";

const Car = ({ id, showPage }) => {
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personWithCarsId: id },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <>
      <List style={{ marginTop: "10px" }} grid={{ gutter: 20, column: 1 }}>
        {data.personWithCars.cars.map(
          ({ id, make, model, personId, price, year }) => (
            <CarCard
              key={id}
              id={id}
              make={make}
              model={model}
              personId={personId}
              price={price}
              year={year}
              showPage={showPage}
            />
          )
        )}
      </List>
    </>
  );
};

export default Car;
