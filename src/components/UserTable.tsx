import type { User } from '../types/User';

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable = ({ users, onEdit, onDelete }: Props) => {
  return (
    <table className="w-full table-auto border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">SL</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td className="p-2 border">{index + 1}</td>
            <td className="p-2 border">{user.name}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border flex gap-4 text-center">
              <button onClick={() => onEdit(user)} className="text-blue-500 w-[40%]">Edit</button>
              <button onClick={() => onDelete(user.id)} className="text-red-500 w-[40%]">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
