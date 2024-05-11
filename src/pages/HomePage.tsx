// import components
import { FindBooks } from "../components/FindBooks";
import { NewReleases } from "../components/NewReleases";

const HomePage = () => {
  return (
    <div>
      <NewReleases></NewReleases>
      <FindBooks></FindBooks>
    </div>
  )
};

export default HomePage;