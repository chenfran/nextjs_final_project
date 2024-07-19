export default function Test() {
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
      <div className="flex items-center justify-between py-3 border-b-2 border-gray-200 px-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
              A
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="text-white mr-3 font-semibold">Username</span>
            </div>
            <span className="text-sm text-white">
              Title: Game Title - Story: Game Story
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">Message 1</div>
          <div className="bg-gray-800 p-4 rounded-lg">Message 2</div>
          <div className="bg-gray-800 p-4 rounded-lg">Message 3</div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <input
          className="w-full p-2 rounded-lg bg-gray-800 text-white"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}
