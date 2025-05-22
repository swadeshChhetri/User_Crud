// import { useState, useEffect } from 'react';
// import { createUser, updateUser } from '../services/api';
// import type { User } from '../types/User';

// interface Props {
//   selectedUser: User | null;
//   onSuccess: () => void;
//   onCancel: () => void;
// }

// const UserForm = ({ selectedUser, onSuccess, onCancel }: Props) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     if (selectedUser) {
//       setName(selectedUser.name);
//       setEmail(selectedUser.email);
//     }
//   }, [selectedUser]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedUser) {
//       await updateUser(selectedUser._id, { name, email });
//     } else {
//       await createUser({ name, email });
//     }
//     onSuccess();
//     setName('');
//     setEmail('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
//       <input
//         type="text"
//         className="border p-2 w-full"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <input
//         type="email"
//         className="border p-2 w-full"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <div className="flex gap-2">
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           {selectedUser ? 'Update' : 'Create'}
//         </button>
//         <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default UserForm;

import { useState, useEffect } from 'react';
import { createUser, updateUser } from '../services/api';
import type { User } from '../types/User';

interface Props {
  selectedUser: User | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const UserForm = ({ selectedUser, onSuccess, onCancel }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    } else {
      setName('');
      setEmail('');
    }
    setError(null);
  }, [selectedUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (selectedUser) {
        await updateUser(selectedUser._id, { name, email });
      } else {
        await createUser({ name, email });
      }
      onSuccess();
      setName('');
      setEmail('');
    } catch (err) {
      setError('Failed to save user. Please try again.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {selectedUser ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;

