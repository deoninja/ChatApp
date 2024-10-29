export default function MessageList({ messages }) {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-start">
            <div className="bg-white rounded-lg shadow p-3">
              <div className="font-semibold text-gray-900">
                {message.sender}
              </div>
              <div className="text-gray-700 mt-1">
                {message.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}