
using Microsoft.AspNetCore.Mvc;
using sales_departements.Context;
using sales_departements.Models;

namespace sales_departements.Controllers;

[Route("department")]
public class DepartmentController : Controller
{
    [HttpGet]
    [Route("department-with-requests-validated")]
    public Bag GetDepartmentRequestsList() {
        string exception = null;
        object? data = null;
        try
        {
            SalesDepartementsContext context = new();
            data = new DepartmentRequests().GetDepartmentRequestsList(context);
        }
        catch (Exception e)
        {
            exception = e.Message;
        }

        return new Bag(exception, data);
    }

}
