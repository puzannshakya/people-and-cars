import { useMutation } from "@apollo/client";
import { Form, Input, Typography, Button, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { ADD_CAR, GET_PERSON_WITH_CARS } from "../../graphql/queries";
import { v4 as uuidv4 } from "uuid";

const { Title } = Typography;
const AddCar = ({ people }) => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const { Option } = Select;
  const [addCar] = useMutation(ADD_CAR);

  const onFinish = (values) => {
    const { year, make, model, price, person } = values;

    addCar({
      variables: {
        addCarId: id,
        year: year,
        make: make,
        model: model,
        price: price,
        personId: person,
      },
      update: (cache, { data: { addCar } }) => {
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
              cars: [...data.personWithCars.cars, addCar],
            },
          },
        });
        form.resetFields();
      },
    });
  };

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <>
      {people.length === 0 ? (
        ""
      ) : (
        <>
          <Title level={3} style={{ marginBottom: 20 }}>
            Add Car
          </Title>
          <Form
            name="add-car"
            layout="inline"
            size="large"
            style={{
              justifyContent: "center",
              marginBottom: "40px",
              flexWrap: "nowrap",
            }}
            form={form}
            onFinish={onFinish}
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
              <InputNumber
                prefix="$"
                placeholder="i.e 20000"
                min={0}
                formatter={(value) => {
                  return value ? `${value}`.replace(/[^0-9.]/g, "") : "";
                }}
              />
            </Form.Item>

            <Form.Item
              name="person"
              rules={[{ required: true, message: "Please Select Person" }]}
              label="Person"
            >
              <Select style={{ width: 200 }} placeholder="Select a Person">
                {people.map(({ id, firstName, lastName }) => (
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
                    !form.isFieldsTouched(true) ||
                    form.getFieldsError().filter(({ errors }) => errors.length)
                      .length
                  }
                >
                  Add Car
                </Button>
              )}
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};
export default AddCar;
