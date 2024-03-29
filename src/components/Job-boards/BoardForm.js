import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBoard, createPriorityRank, getAllCategories } from "../managers/BoardManager";

// Board Form Component allows a user to create a new board.

export const BoardForm = () => {
  const [categories, setCategories] = useState([]);
   const [checkedCategories, setCheckedCategories] = useState(new Set());
  const [board, setBoard] = useState({
    title: "",
    goal: "",
    requirements: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((allCategories) => {
      setCategories(allCategories);
    });
  }, []);

  const postRequestForBoard = (event) => {
    event.preventDefault();

    const boardToApi = {
      title: board.title,
      goal: board.goal,
      requirements: board.requirements,
      categories: Array.from(checkedCategories),
    };


    createBoard(boardToApi).then((board) => {
      postRequestsForPriorityRanks(board.id)
    }).then(() => navigate("/boardmanager"));
  };

  const postRequestsForPriorityRanks = (boardId) => {
    const salaryPriorityToApi = {
      board: boardId,
      name: "salary",
      rank_value: 1
    };
    const locationPriorityToApi = {
      board: boardId,
      name: "location",
      rank_value: 2
    };
    const culturePriorityToApi = {
      board: boardId,
      name: "culture",
      rank_value: 3
    };
    const leadershipPriorityToApi = {
      board: boardId,
      name: "leadership",
      rank_value: 4
    };
    const teamPriorityToApi = {
      board: boardId,
      name: "team",
      rank_value: 5
    };

    createPriorityRank(salaryPriorityToApi)
      .then(() => createPriorityRank(locationPriorityToApi))
      .then(() => createPriorityRank(culturePriorityToApi))
      .then(() => createPriorityRank(leadershipPriorityToApi))
      .then(() => createPriorityRank(teamPriorityToApi));
  }

  return (
    <>
      <main className="flex-col w-full bg-pinkswirl text-slate-500">
        <div className="h-1/6 ">
          <h1 className="p-5 text-4xl text-white font-quicksand">New Board</h1>
        </div>
        <div className="flex justify-center w-full h-5/6">
          <div className="flex-col w-2/5 p-10 bg-white border rounded -md h-5/6">
            <form className="flex-col">
              <fieldset className="mb-5 space-y-2">
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Title:
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="How would you describe your job search?"
                    value={board.title}
                    onChange={(evt) => {
                      const copy = { ...board };
                      copy.title = evt.target.value;
                      setBoard(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="goal"
                  >
                    Goal:
                  </label>
                  <input
                    required
                    rows={3}
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="What is your goal?"
                    value={board.goal}
                    onChange={(evt) => {
                      const copy = { ...board };
                      copy.goal = evt.target.value;
                      setBoard(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Requirements:
                  </label>
                  <input
                    required
                    rows={3}
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="What are your job requirements?"
                    value={board.requirements}
                    onChange={(evt) => {
                      const copy = { ...board };
                      copy.requirements = evt.target.value;
                      setBoard(copy);
                    }}
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group">
                  <label className="text-2xl" htmlFor="age">
                    Categories:
                  </label>
                  {categories.map((category) => (
                    <div className="">
                      {category.name}
                      <input
                        value={category.id}
                        className="w-4 h-4 ml-2 rounded checkbox checkbox-secondary focus:ring-secondary"
                        onChange={(event) => {
                          const copy = new Set(checkedCategories);
                          if (copy.has(category.id)) {
                            copy.delete(category.id);
                          } else {
                            copy.add(category.id);
                          }
                          setCheckedCategories(copy);
                        }}
                        type="checkbox"
                      />
                    </div>
                  ))}
                </div>
              </fieldset>
              <button
                className="px-4 py-2 mt-3 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
                onClick={(clickEvent) => postRequestForBoard(clickEvent)}
              >
                Create New Board!
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
