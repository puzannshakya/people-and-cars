import { useMutation } from "@apollo/client";
import { Form, Input, Typography, Button, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";
import {
  UPDATE_CAR,
  GET_PEOPLE,
  GET_PERSON_WITH_CARS,
} from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const { Title } = Typography;

const UpdateCar = ({
  id,
  make,
  model,
  personId,
  price,
  year,
  onButtonClick,
}) => {
  const previousPersonId = personId;

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const { Option } = Select;
  const [updateCar] = useMutation(UPDATE_CAR);

  const onFinish = (values) => {
    const { year, make, model, price, person } = values;

    updateCar({
      variables: {
        updateCarId: id,
        year: year,
        make: make,
        model: model,
        price: price,
        personId: person,
      },

      update: (cache, { data: { updateCar } }) => {
        if (person !== previousPersonId) {
          //Add Car to new owners list
          const data = cache.readQuery({
            query: GET_PERSON_WITH_CARS,
            variables: { personWithCarsId: person },
          });
          cache.writeQuery({
            query: GET_PERSON_WITH_CARS,
            variables: {
              personWithCarsId: person,
            },

            data: {
              ...data,
              personWithCars: {
                ...data.personWithCars,
                cars: [...data.personWithCars.cars, updateCar],
              },
            },
          });

          const { personWithCars } = cache.readQuery({
            query: GET_PERSON_WITH_CARS,
            variables: {
              personWithCarsId: previousPersonId,
            },
          });

          const updatedCars = personWithCars.cars.filter(
            (car) => car.id !== id
          );

          cache.writeQuery({
            query: GET_PERSON_WITH_CARS,
            variables: {
              personWithCarsId: previousPersonId,
            },
            data: {
              personWithCars: {
                ...personWithCars,
                cars: updatedCars,
              },
            },
          });
        }
      },
    });

    onButtonClick();
  };

  useEffect(() => {
    forceUpdate({});
  }, []);
  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Title level={3} style={{ marginBottom: 20 }}>
        Edit Car's Info
      </Title>
      <Form
        form={form}
        name="update-person-form"
        layout="inline"
        onFinish={onFinish}
        initialValues={{
          make,
          model,
          price,
          year,
          person: personId,
        }}
      >
        <Form.Item
          name="year"
          rules={[{ required: true, message: "Please Enter Year" }]}
          label="Year"
        >
          <InputNumber placeholder="Year i.e 2012" min={1980} />
        </Form.Item>
        <Form.Item
          name="make"
          rules={[{ required: true, message: "Please Enter Make" }]}
          label="Make"
        >
          <Input placeholder="Make" />
        </Form.Item>

        <Form.Item
          name="model"
          rules={[{ required: true, message: "Please Enter Model" }]}
          label="Model"
        >
          <Input placeholder="Model" />
        </Form.Item>

        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please Enter Price" }]}
          label="Price"
        >
          <InputNumber prefix="$" placeholder="i.e 20000" min={0} />
        </Form.Item>

        <Form.Item
          name="person"
          rules={[{ required: true, message: "Please Select Person" }]}
          label="Person"
        >
          <Select style={{ width: 200 }} placeholder="Select a Person">
            {data.people.map(({ id, firstName, lastName }) => (
              <Option key={id} value={id}>
                {firstName} {lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                (!form.isFieldTouched("year") &&
                  !form.isFieldTouched("make") &&
                  !form.isFieldTouched("model") &&
                  !form.isFieldTouched("price") &&
                  !form.isFieldTouched("person")) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Update Info
            </Button>
          )}
        </Form.Item>
        <Button onClick={onButtonClick}>Cancel</Button>
      </Form>
    </>
  );
};
export default UpdateCar;
