using Microsoft.AspNetCore.Mvc;
using sales_departements.Models;
using sales_departements.Models.Display;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using sales_departements.Context;
using System.Text.Json;
using System.Text.Json.Serialization;



namespace sales_departements.Controllers;

[Route("request")]
public class RequestController : Controller
{
    [HttpGet]
    [Route("get-all-requests-no-validated")]
    public Bag GetAllRequestsNoValidated() {
        string? exception = null;
        object? data = null;
        try
        {
            SalesDepartementsContext context = new ();

            string employeeId = new Session().GetSession();
            List<Request> requests = new Request().GetRequestsNoValidatedByDepartement(context, employeeId);
            data = requests;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            exception = e.Message;
        }

        return new Bag(exception, data);
    }

    [HttpGet]
    [Route("get-all-requests-validated")]
    public Bag GetAllRequestsValidated() {
        string? exception = null;
        object? data = null;
        try
        {
            SalesDepartementsContext context = new ();

            string employeeId = new Session().GetSession();
            List<Request> requests = new Request().GetRequestsValidatedByDepartement(context, employeeId);
            data = requests;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            exception = e.Message;
        }

        return new Bag(exception, data);
    }

    [HttpGet]
    [Route("get-all-requests-send-by-self")]
    public Bag GetAllRequests() {
        string? exception = null;
        object? data = null;
        try
        {
            SalesDepartementsContext context = new ();

            string employeeId = new Session().GetSession();
            List<Request> requests = new Request().GetRequestsSendBySelf(context, employeeId);
            data = requests;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            exception = e.Message;
        }

        return new Bag(exception, data);
    }

    [HttpPost]
    [Route("create")]
    public string? Create([FromBody] List<RequestDetail> requestDetails) {
        string? strings = null;
        try {
            SalesDepartementsContext context = new();

            string? employeeId = new Session().GetSession();
            Employee employee = new Employee().GetEmployee(context, employeeId);
            string? departmentId = employee.DepartmentId;


            DateTime createdAt = DateTime.Now;

            string requestId = new Request(departmentId, createdAt,employeeId).Create(context);

            new RequestDetail().Creates(context, requestDetails, requestId);
            Console.WriteLine(requestId);
            context.SaveChanges();

        }
        catch(Exception ex) {
            Console.WriteLine(ex);
            strings = ex.Message;
        }
        return strings;
    }

    [HttpPost]
    [Route("validate")]
    public Bag Validate([FromBody] RequestModel model) {
        string? exception = null;
        object? data = null;
        try {
            SalesDepartementsContext context = new();

            string employeeId = new Session().GetSession();
            Employee employee = new Employee().GetEmployeeById(context, employeeId);
            employee.CanValidateRequest();
            new Request().UpdateIsValidate(context, model.RequestId);
            new RequestDetail().UpdateIsValidates(context, model.RequestDetailsId);

            context.SaveChanges();
        }
        catch(Exception ex) {
            Console.WriteLine(ex);
            exception = ex.Message;
        }
        return new Bag(exception, data);
    }

    [HttpGet]
    [Route("getAllByProducts")]
    public string GetAllByProductsAndDepartment()
    {
        string? exception = null;
        object? data = null;
        try
        {
            SalesDepartementsContext context = new SalesDepartementsContext();
            List<VRequestCurve> allData = context.VRequestCurves.ToList();
            List<RequestCurve> requestCurves = new VRequestCurve().GetVRequestCurvesWithDepartments(context, allData);
            data = requestCurves;
        }
        catch (Exception e)
        {
            exception = e.Message;
        }
        Bag bag = new Bag(exception, data);
        string json = JsonConvert.SerializeObject(bag);
        Console.WriteLine(json);

        return JsonConvert.SerializeObject(bag);
    }

    // [HttpGet]
    // [Route("add-in-request-detail")]
    // public void AddInRequestDetail(string product_id, int quantity, string reason) {
    //     string requestDetailJson = HttpContext.Session.GetString("requestDetailJson");

    //     RequestDetail requestDetail = new (product_id, quantity, reason);
    //     string newRequestDetailJson = JsonConvert.SerializeObject(requestDetail);

    //     if(string.IsNullOrEmpty(requestDetailJson)) {
    //         HttpContext.Session.SetString("requestDetailJson", newRequestDetailJson);
    //     }
    //     else {
    //         List<RequestDetail> requestDetails =  JsonConvert.DeserializeObject<List<RequestDetail>>(requestDetailJson);
    //         requestDetails.Add(requestDetail);
    //         newRequestDetailJson = JsonConvert.SerializeObject(requestDetails);
    //         HttpContext.Session.SetString("requestDetailJson", newRequestDetailJson);
    //     }
    // }

}
