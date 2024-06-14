import MainContainer from "../components/MainContainer";
import { useRouter } from "next/router";
import Words from "./Words";
import Dictionary from "./Dictionary";
import Quiz from "./Quiz";

const App = () => {
  const router = useRouter();
  let Component;
  switch (router.pathname) {
    case "/Words":
      Component = Words;
      break;
    case "/Dictionary":
      Component = Dictionary;
      break;
    case "/Quiz":
      Component = Quiz;
      break;
    default:
      Component = () => <div>404 Not Found</div>;
  }

  return (
    <MainContainer>
      <div id="__next" className="next"></div>
      <style jsx>
        {`
        .next{
        display: flex;
        height:100%;
        }
        `}
      </style>
    </MainContainer>
  );
};

export default App;
