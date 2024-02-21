import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import DeleteCar from "../buttons/DeleteCar";
import { useState } from "react";
import UpdateCar from "../forms/UpdateCar";

const CarCard = ({ id, make, model, personId, price, year, showPage }) => {
  const formattedPrice = price.toLocaleString();
  const [editMode, setEditMode] = useState(false);

  const symbol = "->$";

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };
  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          make={make}
          model={model}
          personId={personId}
          price={price}
          year={year}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          type="inner"
          style={{ backgroundColor: "rgba(231, 226, 226, 0.412)" }}
          actions={
            !showPage && [
              <EditOutlined key="edit" onClick={handleButtonClick} />,
              <DeleteCar id={id} personId={personId} />,
            ]
          }
        >
          {year} {make} {model} {symbol} {formattedPrice}
        </Card>
      )}
    </div>
  );
};

export default CarCard;
