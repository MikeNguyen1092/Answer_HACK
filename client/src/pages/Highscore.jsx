import { useQuery } from "@apollo/client";
import { QUERY_HIGHSCORES } from "../utils/queries";

const Highscore = () => {
  const { loading, data } = useQuery(QUERY_HIGHSCORES);
  const highscores = data?.users || [];

  console.log(highscores);

  //html
  return (
    <>
      <div>Highscore</div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Highscores</th>
          </tr>
        </thead>{" "}
        <thead>
          <tr>
            <th>rank</th>
            <th>score</th>
            <th>username</th>
          </tr>
        </thead>
        <tbody>
          {highscores &&
            highscores.map((highscore, i) => (
              <>
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{highscore.highScore}</td>
                  <td>{highscore.username}</td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Highscore;
