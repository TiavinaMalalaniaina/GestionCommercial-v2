using sales_departements.Context;

namespace sales_departements.Models;

public class DepartmentRequests
{
    public string DepartmentId { get; set; }
    public Department Department { get; set; }
    public List<Request> Requests { get; set; }

    public List<DepartmentRequests> GetDepartmentRequestsList(SalesDepartementsContext context)
    {
        List<DepartmentRequests> departmentRequestsList = new();
        
        List<Department> departments = new Department().GetDepartments(context);
        foreach (var department in departments)
        {
            DepartmentRequests departmentRequests = new DepartmentRequests();
            departmentRequests.DepartmentId = department.DepartmentId;
            departmentRequests.Department = department;
            departmentRequests.Requests =
                new Request().GetRequestsValidatedByDepartementId(context, department.DepartmentId);
            if (departmentRequests.Requests.Count > 0)
            {
                departmentRequestsList.Add(departmentRequests);
            }
        }

        return departmentRequestsList;
    }
}