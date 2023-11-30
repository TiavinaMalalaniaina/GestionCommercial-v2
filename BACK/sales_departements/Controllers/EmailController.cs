using Microsoft.AspNetCore.Mvc;
using sales_departements.Models;
using sales_departements.Models.email;

namespace sales_departements.Controllers;

[Route("email")]
public class  EmailController : Controller
{
    [HttpGet]
    [Route("send")]
    public Bag SendEmail(string supplierEmail) {
        string strings = null;
        object? data = null;
        try
        {
            Email email = new Email();
            email.SendEmailToSupplier(supplierEmail);
        }
        catch (Exception e)
        {
            strings = e.Message;
        }

        return new Bag(strings, data);
    }
}