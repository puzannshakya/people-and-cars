import { List, Typography } from "antd";
import PersonCard from "../listItems/PersonCard";

const getStyles = () => ({
  list: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

const People = ({ people, showPage }) => {
  const { Title } = Typography;
  const styles = getStyles();

  return (
    <>
      {people.length === 0 ? (
        ""
      ) : (
        <>
          <Title level={3} style={{ marginBottom: 20 }}>
            Records
          </Title>
          <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {people.map(({ id, firstName, lastName }) => (
              <List.Item key={id}>
                <PersonCard
                  id={id}
                  firstName={firstName}
                  lastName={lastName}
                  showPage={showPage}
                />
              </List.Item>
            ))}
          </List>
        </>
      )}
    </>
  );
};
export default People;
