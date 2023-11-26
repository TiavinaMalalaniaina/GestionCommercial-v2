using Microsoft.AspNetCore.Mvc;
using sales_departements.Context;
using sales_departements.Models;

namespace sales_departements.Controllers;

[Route("proforma/detail")]
public class ProformaDetailController : Controller
{
    [HttpGet]
    [Route("list-product")]
    public  Bag GetListProductsAtProformaDetails() {
        string? exception = null;
        object? data = null;
        try
        {
            SalesDepartementsContext context = new();
            data = new ProformaDetail().GetListProductsAtProformaDetails(context);

        }
        catch(Exception ex) {
            Console.WriteLine(ex.Message);
            exception = ex.Message;
        }

        return new Bag(exception, data);
    }
}