import { useParams } from "react-router-dom";
import { GET_PERSON_BY_ID } from "../graphql/queries";
import PersonCard from "../components/listItems/PersonCard";
import { useQuery } from "@apollo/client";

const ShowPage = () => {
  let { personId } = useParams();
  const showPage = true;
  const { loading, error, data } = useQuery(GET_PERSON_BY_ID, {
    variables: { personId: personId },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PersonCard
        id={data.person.id}
        firstName={data.person.firstName}
        lastName={data.person.lastName}
        showPage={showPage}
      />
    </div>
  );
};
export default ShowPage;
