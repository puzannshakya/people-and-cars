import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { DELETE_PERSON, GET_PEOPLE } from "../../graphql/queries";
import filter from "lodash.filter";

const DeletePerson = ({ id }) => {
  const [deletePerson] = useMutation(DELETE_PERSON, {
    update(cache, { data: { deletePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, (p) => {
            return p.id !== deletePerson.id;
          }),
        },
      });
    },
  });
  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this perso?");
    if (result) {
      deletePerson({
        variables: {
          deletePersonId: id,
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

export default DeletePerson;
