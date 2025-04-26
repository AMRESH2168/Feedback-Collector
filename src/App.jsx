import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [viewFeedback, setViewFeedback] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newFeedback = { name, email, message };

    // Send feedback data using POST request
    await fetch('/.netlify/functions/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    setLoading(false);
    alert('Feedback submitted!');
    
    // Clear form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleViewFeedback = async () => {
    setViewFeedback(!viewFeedback);

    if (!viewFeedback) {
      // Fetch feedback data using GET request
      const response = await fetch('/.netlify/functions/get-feedbacks');
      const data = await response.json();
      setFeedbacks(data);
      console.log("this is from get:->",data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Feedback Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="message" className="block text-gray-700 font-medium">Feedback Message</label>
            <textarea
              id="message"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md ${loading && 'opacity-50'}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleViewFeedback}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
            >
              {viewFeedback ? 'Hide Feedback' : 'View Submitted Feedback'}
            </button>
          </div>
        </form>

        {viewFeedback && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-red-800">Submitted Feedbacks</h3>
            <ul className="mt-4 space-y-4">
              {feedbacks.map((feedback, index) => (
                <li key={index} className="p-4 border border-grey-200 rounded-lg bg-white-50 text-black shadow-sm">
                  <p><strong>Name:</strong> {feedback.name}</p>
                  <p><strong>Email:</strong> {feedback.email}</p>
                  <p><strong>Message:</strong> {feedback.message}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <footer className="fixed bottom-2 text-center text-sm text-gray-600 w-full">
        <p>Made by Amresh | Feedback Collector App</p>
      </footer>
    </div>
  );
}

export default App;
