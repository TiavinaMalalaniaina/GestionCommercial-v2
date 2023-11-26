using sales_departements.Context;

namespace sales_departements.Models;

public partial class Request
{
    public string RequestId { get; set; } = null!;

    public string? DepartmentId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool? IsValidated { get; set; }
    public string EmployeeId { get; set; }

    public virtual Department? Department { get; set; }

    public virtual List<RequestDetail> RequestDetails { get; set;}
    public virtual Employee Employee{ get; set; }

    public Request(string? departementId, DateTime? createdAt, string employeeId) {
        DepartmentId = departementId;
        CreatedAt = createdAt;
        EmployeeId = employeeId;
    }

    public Request() {

    }

    public string Create(SalesDepartementsContext context) {
        context.Requests.Add(this);
        context.SaveChanges();
        return this.RequestId;
    }

    public void UpdateIsValidate(SalesDepartementsContext context, string requestId) {
        var requestToUpdate = context.Requests.Find(requestId);
        if (requestToUpdate != null) {
            requestToUpdate.IsValidated = true;
        }
    }

    public List<Request> GetRequestsNoValidated(SalesDepartementsContext context) {
        List<Request> requests = context.Requests.Where(r => r.IsValidated == false).ToList();
        for (int i = 0; i < requests.Count; i++)
        {
            requests[i].RequestDetails = new RequestDetail().GetRequestDetails(context, requests[i].RequestId);
            requests[i].Department = new Department().GetDepartment(context, requests[i].DepartmentId);
            requests[i].Employee = new Employee().GetEmployee(context, requests[i].EmployeeId);
        }
        return requests;

    }

    public List<Request> GetRequestsValidated(SalesDepartementsContext context) {
        //string employeeId = new Session().GetSession();
        List<Request> requests = context.Requests.Where(r => r.IsValidated == true).ToList();
        for (int i = 0; i < requests.Count; i++)
        {
            requests[i].RequestDetails = new RequestDetail().GetRequestDetails(context, requests[i].RequestId);
            requests[i].Department = new Department().GetDepartment(context, requests[i].DepartmentId);
            requests[i].Employee = new Employee().GetEmployee(context, requests[i].EmployeeId);
        }
        return requests;

    }

    public List<Request> GetRequestsValidatedByDepartement(SalesDepartementsContext context, string employeeId) {
        List<Request> requestsValidated = GetRequestsValidated(context);
        Employee employee = new Employee().GetEmployee(context, employeeId);
        List<Request> requestsValidatedByDepartment = new();
        foreach (Request request in requestsValidated)
        {
            if (request.DepartmentId.Equals(employee.DepartmentId) && !string.IsNullOrEmpty(employee.DepartmentHeadId))
                requestsValidatedByDepartment.Add(request);
        }
        return requestsValidatedByDepartment;
    }
    public List<Request> GetRequestsNoValidatedByDepartement(SalesDepartementsContext context, string employeeId) {
        List<Request> requestsNoValidated = GetRequestsNoValidated(context);
        Employee employee = new Employee().GetEmployee(context, employeeId);
        List<Request> requestsNoValidatedByDepartment = new();
        foreach (Request request in requestsNoValidated)
        {
            if (request.DepartmentId.Equals(employee.DepartmentId) && !string.IsNullOrEmpty(employee.DepartmentHeadId))
                requestsNoValidatedByDepartment.Add(request);
        }
        return requestsNoValidatedByDepartment;
    }

    public List<Request> GetRequestsSendBySelf(SalesDepartementsContext context, string employeeId) {
        Employee employee = new Employee().GetEmployee(context, employeeId);
        List<Request> requests = context.Requests.Where(r => r.EmployeeId.Equals(employeeId)).ToList();
        for (int i = 0; i < requests.Count; i++)
        {
            requests[i].RequestDetails = new RequestDetail().GetRequestDetails(context, requests[i].RequestId);
            requests[i].Department = new Department().GetDepartment(context, requests[i].DepartmentId);
            requests[i].Employee = new Employee().GetEmployee(context, requests[i].EmployeeId);
        }
        return requests;
    }
    
    public bool IsAlreadyTaken(List<Request> requests, Request request)
    {
        foreach (var requestV in requests)
        {
            if (request.RequestId.Equals(request.RequestId))
            {
                return true;
            }
        }

        return false;
    }
    
    
    public List<Request> GetRequestsWithProductsList(SalesDepartementsContext context, List<string> productIds)
    {
        List<Request> requests = GetRequestsValidated(context);
        List<Request> requestsReturn = new List<Request>();
        foreach (var product in productIds)
        {
            foreach (var request in requests)
            {
                if (!IsAlreadyTaken(requestsReturn, request) && IsProductInRequest(product, request))
                {
                    requestsReturn.Add(request);
                }
            }
        }

        return requestsReturn;
    }

    public bool IsProductInRequest(string productId, Request request)
    {
        List<RequestDetail> requestDetails = request.RequestDetails;
        foreach (var requestDetail in requestDetails)
        {
            if (requestDetail.ProductId.Equals(productId))
            {
                return true;
            }
        }

        return false;
    }
}
