import { useMutation } from "@apollo/client";
import { Typography, Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_PERSON } from "../../graphql/queries";
const { Title } = Typography;
const UpdatePerson = (props) => {
  const { id, firstName, lastName } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);
  const [updatePerson] = useMutation(UPDATE_PERSON);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        updatePersonId: id,
        firstName: firstName,
        lastName: lastName,
      },
    });
    props.onButtonClick();
  };
  return (
    <>
      <Title level={3} style={{ marginBottom: 20 }}>
        Edit Person's Info
      </Title>
      <Form
        form={form}
        name="update-person-form"
        layout="inline"
        onFinish={onFinish}
        initialValues={{
          firstName,
          lastName,
        }}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please Enter First Name" }]}
          label="First Name"
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please Enter Last Name" }]}
          label="Last Name"
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                (!form.isFieldTouched("firstName") &&
                  !form.isFieldTouched("lastName")) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Update Info
            </Button>
          )}
        </Form.Item>
        <Button onClick={props.onButtonClick}>Cancel</Button>
      </Form>
    </>
  );
};
export default UpdatePerson;
