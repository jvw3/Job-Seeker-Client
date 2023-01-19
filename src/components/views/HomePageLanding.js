import SalyImg from "./HompageImages/Saly-1.png"

// HomePage Landing Component displays the homepage for an unauthorized user's view.


export const HomePageLanding = () => {

  return (
    <main className="bg-pinkswirl ">
      <div className="flex h-screen">
        <div className="self-center w-1/5 p-10 text-left text-white text-7xl font-quicksand">
          Are you ready to take your Job Search to the next Level?
        </div>
        <img className="w-3/5" src={SalyImg}></img>
        <div className="w-1/5 mt-32 text-4xl text-white font-quicksand">Job Seeker is a job application tracker built for developers.</div>
      </div>
    </main>
  );
};
