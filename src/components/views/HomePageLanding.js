import SalyImg from "./HompageImages/Saly-1.png"
import { NavBar } from "../navbar/NavBar";

// HomePage Landing Component displays the homepage for an unauthorized users view


export const HomePageLanding = () => {

  return (
    <main className="h-screen bg-pinkswirl">
      <NavBar  />
      <div className="flex justify-between ">
        <img className="w-1/2 h-5/6" src={SalyImg}></img>
        <div className="self-start w-1/3 p-10 mt-10 text-5xl leading-tight text-right text-white font-quicksand">
          Are you ready to take your job search to the next level?
        </div>
      </div>
    </main>
  );
};
