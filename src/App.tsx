import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from './services/api';
import type { User } from './types/User';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (_id: string) => {
    await deleteUser(_id);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
      <h5 className='text-center'>(React, Typescript, TailwindCSS, Node.js, Express, MongoDB)</h5>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>

          <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded mb-4 float-right">
            + Add User
          </button>

          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                  &times;
                </button>
                <UserForm
                  selectedUser={selectedUser}
                  onSuccess={() => {
                    fetchUsers();
                    setShowForm(false);
                  }}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </div>
          )}

          <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default App;

