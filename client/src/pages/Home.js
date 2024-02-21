import AddPerson from "../components/forms/AddPerson";
import AddCar from "../components/forms/AddCar";
import People from "../components/list/People";
import { GET_PEOPLE } from "../graphql/queries";
import { useQuery } from "@apollo/client";
const Home = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <hr
        style={{ width: "1290px", height: "1px", backgroundColor: "lightgray" }}
      ></hr>
      <AddPerson />
      <AddCar people={data.people} />
      <People people={data.people} showPage={false} />
    </div>
  );
};
export default Home;
