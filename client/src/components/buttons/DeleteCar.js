import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { DELETE_CAR, GET_PERSON_WITH_CARS } from "../../graphql/queries";

const DeleteCar = ({ id, personId }) => {
  const [deleteCar] = useMutation(DELETE_CAR);

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");
    if (result) {
      deleteCar({
        variables: {
          deleteCarId: id,
        },
        update: (cache) => {
          const { personWithCars } = cache.readQuery({
            query: GET_PERSON_WITH_CARS,
            variables: {
              personWithCarsId: personId,
            },
          });

          const updatedCars = personWithCars.cars.filter(
            (car) => car.id !== id
          );

          cache.writeQuery({
            query: GET_PERSON_WITH_CARS,
            variables: {
              personWithCarsId: personId,
            },
            data: {
              personWithCars: {
                ...personWithCars,
                cars: updatedCars,
              },
            },
          });
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default DeleteCar;
