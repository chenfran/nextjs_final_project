export default function CreateNewGame() {
  return (
    <div className="flex flex-col justify-center text-center pt-4">
      <h1 className="text-4xl font-bold mb-8">Create a new game</h1>
      <form
        className="flex flex-col items-center w-full max-w-md mx-auto"
        // onSubmit={async (event) => await handleLogin(event)}
      >
        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full">
          Title
          <input
            className="grow"
            // value={username}
            // onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full">
          Description
          <input
            className="grow"
            // value={password}
            // onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <div className="flex justify-end w-full">
          <button className="btn bg-red-900 border-red-900 text-white gap-2">
            Submit
          </button>
        </div>

        {/* {errors.map((error) => (
          <div key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))} */}
      </form>
    </div>
  );
}
