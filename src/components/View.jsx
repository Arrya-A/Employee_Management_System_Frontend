import React, { useEffect, useState } from 'react'
import { getDataAPI, removeDataAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

const View = ({ uploadDataResponse }) => {
    const [allEmployee, setAllEmployee] = useState([])
    const getAllEmployee = async () => {
        const result = await getDataAPI()
        console.log(result);

        if (result.status >= 200 && result.status < 300) {
            setAllEmployee(result.data)

        }
    }
    console.log(allEmployee);


    const removeEmployee = async (id) => {
        await removeDataAPI(id)
        getAllEmployee()
    }


    useEffect(() => {
        getAllEmployee()
    }, [uploadDataResponse])

    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allEmployee.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.status}</td>
                            <td>
                                <Link to={`/edit/${employee.id}`} className="btn btn-outline-info me-2">EDIT</Link>
                                <button className="btn btn-outline-danger" onClick={() => removeEmployee(employee.id)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default View