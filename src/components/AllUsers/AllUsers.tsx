import { useContext, useEffect, useState } from 'react';
import { apiBase } from '../../config';
import { doDeleteUser, getToken } from '../../services/User';
import { Table } from 'react-bootstrap';
import { IoTrash } from "react-icons/io5";
import { ToastsContext } from '../../context/ToastsContext';



interface IAllUsers {
    _id: string
    name: {
        first: string
        last: string
    }
    email: string
    phone: string
}

export default function AllUsers() {
    const [token, setToken] = useState<string>();
    const [users, setUsers] = useState<IAllUsers[] | null>(null);
    const toasts = useContext(ToastsContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await getToken();
                if (token) setToken(token);
                if (!token) throw new Error('No token found');


                const response = await fetch(`${apiBase}/users`, {
                    headers: {
                        'x-auth-token': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();

                setUsers(data);
            } catch (error) {
            }
        };
        fetchUsers();
    }, [users]);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>_id</th>
                        <th>first Name</th>
                        <th>last Name</th>
                        <th>EMail</th>
                        <th>Phone Num</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user._id}</td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td><IoTrash onClick={
                                () => {
                                    doDeleteUser(token!, user._id)
                                    setUsers(users.filter(newUser => (newUser._id !== user._id)))
                                    toasts?.addToast('👍🏼', 'Successfully Deleted', 'UserDeleted', 'success')
                                }
                            } /></td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        </>
    );
}