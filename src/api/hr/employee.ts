import { Employee } from "../../types/hr";
import axios from 'axios';


export const fetchEmployees = async (page: number, limit: number, companyId: string): Promise<{ data: Employee[], total: number, error?: string }> => {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/employees`, {
            params: {
                page,
                limit,
                companyId
            }
        });

        const data = response.data.data || [];
        const employees: Employee[] = [];

        data.forEach((element: any) => {
            // Format the date to YYYY-MM-DD
            const formatDate = (dateString: string) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
            };

            employees.push({
                id: element.id,
                name: element.fullName,
                position: element.position,
                department: element.department? element.department.name : 'Not available',
                email: element.email,
                phone: element.phone,
                hireDate: formatDate(element.hireDate),
                status: element.status? element.status : 'SUSPENDED',
                contractType: "full_time",
                roles: []
            });
        });

        return {
            data: employees,
            total: response.data.total || 0
        };

    } catch (error) {
        console.error('Error fetching employees:', error);
        
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Server responded with error status
                return {
                    data: [],
                    total: 0,
                    error: `Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`
                };
            } else if (error.request) {
                // Request was made but no response received
                return {
                    data: [],
                    total: 0,
                    error: 'Network error: Unable to connect to server'
                };
            } else {
                // Something else happened
                return {
                    data: [],
                    total: 0,
                    error: `Request error: ${error.message}`
                };
            }
        } else {
            // Non-Axios error
            return {
                data: [],
                total: 0,
                error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
            };
        }
    }
}