import { useSelector } from "react-redux";

const TheWritter = () => {
  const { mern, others } = useSelector((me) => me.skill);

  return (
    <>
      <core>
        {mern.map((item, index) => {
          return (
            <name key={index}>{item.technolodgy}</name>
          )
        })}
      </core>

      <more>
        {others.map((item, index) => {
          return (
            <name key={index}>{item.frameworks}</name>
          )
        })}
      </more>
    </>
  );
};

export default TheWritter;
